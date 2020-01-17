const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../../../models/User");
const { hashPassword } = require("../../../helpers/password");
const checkValidId = require("../../../helpers/checkValidId");

module.exports = async function(req, res) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    const error = errors[0].msg;
    return res.status(400).json({ error });
  }

  const error =
    "Invalid password reset attempt. Please reset it again or contact the administrator.";

  const { id, token, password } = req.body;

  const idIsValid = checkValidId(id);

  if (!idIsValid) {
    return res.status(400).json({ error });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ error });
  }

  const secret = user.password + "-" + user.createdAt;
  const decoded = await jwt.decode(token, secret);

  if (!decoded) {
    return res.status(400).json({ error });
  }

  if (decoded.user.id !== user.id) {
    return res.status(400).json({ error });
  }

  const hashedPassword = await hashPassword(password);

  await User.findByIdAndUpdate(user.id, {
    password: hashedPassword
  });

  return res
    .status(200)
    .json({ success: "Password has been updated, please login using it." });
};
