const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../../../models/User");
const checkValidId = require("../../../helpers/checkValidId");

module.exports = async function(req, res) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    const error = errors[0].msg;
    return res.status(400).json({ error });
  }

  const error = "Invalid email verification attempt.";

  const { id, token } = req.body;

  const idIsValid = checkValidId(id);

  if (!idIsValid) {
    return res.status(400).json({ error });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ error });
  }

  if (user.emailVerified) {
    return res
      .status(400)
      .json({ error: "Your email address has already been verified." });
  }

  const secret = user.email + "-" + user.createdAt;
  const decoded = await jwt.decode(token, secret);

  if (!decoded) {
    return res.status(400).json({ error });
  }

  if (decoded.user.email !== user.email) {
    return res.status(400).json({ error });
  }

  await User.findByIdAndUpdate(user.id, {
    emailVerified: true
  });

  return res
    .status(200)
    .json({ success: "Your email address has been verified. Thank you." });
};
