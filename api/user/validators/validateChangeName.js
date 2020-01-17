const { check } = require("express-validator");

module.exports = [
  check("name", "Name must be at least 3 characters in length.").isLength({
    min: 3
  })
];
