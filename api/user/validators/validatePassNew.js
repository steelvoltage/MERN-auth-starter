const { check } = require("express-validator");

module.exports = [
  check("id", "Invalid password reset attempt.").isString(),
  check("token", "Invalid password reset attempt.").isString(),
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
