const fs = require("fs");

var firstName = document.getElementById('firstname').value;
var middleName = document.getElementById('middlename').value;
var lastName = document.getElementById('lastname').value;
var code = document.getElementById('countrycode').value;
var phoneNumber = document.getElementById('phone').value;
var address = document.getElementById('phone').value;
var email= document.getElementById('email').value;
var password = document.getElementById('pass').value;
var re_pass = document.getElementById('repass').value;

let user = {
 FirstName: firstName,
 MiddleName: middleName,
 LastName: lastName,
 Code: code,
 PhoneNumber: phoneNumber,
 Address: address,
 Email: email,
 Password: password,
 Re_pass: re_pass

};





