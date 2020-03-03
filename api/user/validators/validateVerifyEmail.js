const { check } = require("express-validator");

module.exports = [
  check("id", "Invalid email verification attempt.").isString(),
  check("token", "Invalid email verification attempt.").isString()
];
