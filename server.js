var express = require("express");
var app = express();
var path = require("path");
//use handlebars view engine
const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
var fs = require('fs');
//use body parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


//get the data from the user.json file and then save it in array
let users = [];
let getUserdata=()=>{
 //make a promise
  return new Promise((resolve,reject)=>{
    fs.readFile('data/user.json', 'utf8', function (err, data) {
      if (err) throw err;
      users = JSON.parse(data);
      resolve(users);
    });
  });

}

var HTTP_PORT = process.env.PORT || 8080;

app.use('/static', express.static(path.join(__dirname, "static")));
//for / roue to render index.handlebars
app.get("/", function (req, res) {
  getUserdata();
  console.log(users);
  res.render("home", { layout: false });
});
app.get("/home", function (req, res) {
  res.render("home", { layout: false });
});

app.get("/registration", function (req, res) {
  res.render("registration", { layout: false });
});
app.post("/registration", function (req, res) {
  //get data from the form and add it to the database
  let data = req.body;
  //save data to json array and validate
  let valid = true;
  let userDetails = {
    "firstname": data.firstname,
    "lastname": data.lastname,
    "email": data.email,
    "password": data.pass,
    "confirmPassword": data.repass,
    "address": data.address,
    "phone": data.phone
  }
  console.log(userDetails);
  let wrongMessageArray = [];
  if (data.firstname == "" || data.firstname == null) {
    valid = false;
    wrongMessageArray.push("First name is required");
  }
  if (data.lastname == "" || data.lastname == null) {
    valid = false;
    wrongMessageArray.push("Last name is required");
  }
  if (data.email == "" || data.email == null) {
    valid = false;
    wrongMessageArray.push("Email is required");
  }
  if (data.pass == "" || data.pass == null) {
    valid = false;
    wrongMessageArray.push("Password is required");
  }
  if (data.repass == "" || data.repass == null) {
    valid = false;
    wrongMessageArray.push("Confirm password is required");
  }
  if (data.address == "" || data.address == null) {
    valid = false;
    wrongMessageArray.push("Address is required");
  }
  if (data.phone == "" || data.phone == null) {
    valid = false;
    wrongMessageArray.push("Phone number is required");
  }

  if (valid) {
    let regex = /^[a-zA-Z]+$/;
    if (!regex.test(userDetails.firstname)) {
      valid = false;
      wrongMessageArray.push("First name is not valid");
    }
    if (!regex.test(userDetails.lastname)) {
      valid = false;
      wrongMessageArray.push("Last name is not valid");
    }
    regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!regex.test(userDetails.email)) {
      valid = false;
      wrongMessageArray.push("Email is not valid");
    }
    regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!regex.test(userDetails.password)) {
      valid = false;
      wrongMessageArray.push("Password is not valid");
    }
    if (userDetails.password != userDetails.confirmPassword) {
      valid = false;
      wrongMessageArray.push("Password and confirm password do not match");
    }
    regex = /^[0-9]{10}$/;
    if (!regex.test(userDetails.phone)) {
      valid = false;
      wrongMessageArray.push("Phone number is not valid");
    }

  }

  if (valid) {
    users.push(userDetails);
    fs.writeFileSync('data/user.json', JSON.stringify(users));
    res.render("home", { layout: false });
  
  }
  else {
    res.render("registration", { errors: wrongMessageArray, layout: false });
  }


});

app.get("/login", function (req, res) {
  res.render("login", { layout: false });
});
app.post("/login", function (req, res) {
  console.log("i am here");
  //get data from the req
  let data = req.body;
  //save the data in object
  let userDetails = {
    "email": data.username,
    "password": data.password
  }
  console.log(userDetails)
  //validate the data using users array
  let valid = true;
  let wrongMessageArray = [];
  if (userDetails.email == "" || userDetails.email == null) {
    valid = false;
    wrongMessageArray.push("Email is required");
  }
  if (userDetails.password == "" || userDetails.password == null) {
    valid = false;
    wrongMessageArray.push("Password is required");
  }
//check if the user is valid using the array and if it is valid redirect to dashboard
  if (valid) {
    valid = false;
    for(let i=0;i<users.length;i++){
      if(users[i].email==userDetails.email && users[i].password==userDetails.password){
        res.render("dashboard", { layout: false, name: users[i].firstname });
        valid=true;
        break;
      }
    }
    if(valid==false){
      wrongMessageArray.push("Email or password is incorrect");
      res.render("login", { errors: wrongMessageArray, layout: false });
    }
  }

});

app.get("/article", function (req, res) {
  res.render("article", { layout: false });
});

getUserdata().then((users)=>{
  app.listen(HTTP_PORT, function () {
    console.log("Express http server listening on: " + HTTP_PORT);
  });
});
