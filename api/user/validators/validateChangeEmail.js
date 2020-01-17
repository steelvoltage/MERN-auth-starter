const { check } = require("express-validator");

module.exports = [
  check("email", "Please enter a valid email address.").isEmail()
];
