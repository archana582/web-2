var express = require("express");
var app = express();
var path = require("path");

var HTTP_PORT = process.env.PORT || 2000;

app.use('/static', express.static(path.join(__dirname, "static")));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/home.html"));
  });

app.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});  

app.get("/registration", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/registration.html"));
});

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/login.html"));
  });

  app.get("/article", function (req, res) {
    res.sendFile(path.join(__dirname, "/views/article.html"));
  });

app.listen(HTTP_PORT);