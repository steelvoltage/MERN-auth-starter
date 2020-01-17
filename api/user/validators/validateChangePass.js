const { check } = require("express-validator");

module.exports = [
  check("currentPassword", "Current password is invalid.").isLength({ min: 6 }),
  check(
    "newPassword",
    "New password must be at least 6 characters in length."
  ).isLength({ min: 6 }),
  check("newPasswordTwo").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Confirm new password must match new password.");
    }
    return true;
  })
];
