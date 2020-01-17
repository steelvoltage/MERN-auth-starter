const { check } = require("express-validator");

module.exports = [
  check("email", "Please enter a valid email address.").isEmail(),
  check("name", "Name must be at least 3 characters in length.").isLength({
    min: 3
  }),
  check(
    "password",
    "Password must be at least 6 characters in length."
  ).isLength({ min: 6 }),
  check("passwordTwo").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Confirm password must match password.");
    }
    return true;
  })
];
