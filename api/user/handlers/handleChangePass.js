const { validationResult } = require("express-validator");
const User = require("../../../models/User");
const { checkPassword, hashPassword } = require("../../../helpers/password");
const checkValidId = require("../../../helpers/checkValidId");

module.exports = async function(req, res) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    const error = errors[0].msg;
    return res.status(400).json({ error });
  }
  const error =
    "User account error, please logout and back in and then try again.";

  const idIsValid = checkValidId(req.user.id);
  if (!idIsValid) {
    return res.status(400).json({ error });
  }

  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(400).json({ error });
  }

  const validCurrentPassword = await checkPassword(
    currentPassword,
    user.password
  );

  if (!validCurrentPassword) {
    return res.status(401).json({ error: "Current password is invalid." });
  }

  const samePassword = await checkPassword(newPassword, user.password);

  if (samePassword) {
    return res
      .status(400)
      .json({ error: "Current password and new password are the same." });
  }

  const hashedPassword = await hashPassword(newPassword);

  await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

  res.status(200).json({
    success:
      "Your password has been changed. Please login again using new password."
  });
};
