const { validationResult } = require("express-validator");
const User = require("../../../models/User");
const checkValidId = require("../../../helpers/checkValidId");

module.exports = async function(req, res) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    const error = errors[0].msg;
    return res.status(400).json({ error });
  }
  const error = "User account error, please login and try again.";

  const idIsValid = checkValidId(req.user.id);
  if (!idIsValid) {
    return res.status(400).json({ error });
  }

  const { name } = req.body;

  const user = await User.findById(req.user.id);

  if (user.name === name) {
    return res
      .status(400)
      .json({ error: "Current name and new name are the same." });
  }

  if (!user) {
    return res.status(400).json({ error });
  }

  await User.findByIdAndUpdate(req.user.id, { name });

  res.status(200).json({ success: "Your name has been changed." });
};
