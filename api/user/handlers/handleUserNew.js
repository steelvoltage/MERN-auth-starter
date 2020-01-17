const { validationResult } = require("express-validator");
const { hashPassword } = require("../../../helpers/password");
const User = require("../../../models/User");

module.exports = async function(req, res) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    const error = errors[0].msg;
    return res.status(400).json({ error });
  }

  const { email, name, password } = req.body;

  const currentUser = await User.findOne({ email });

  if (currentUser) {
    return res
      .status(400)
      .json({
        error: "A user account exists with the provided email address."
      });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await new User({
    email,
    name,
    password: hashedPassword
  }).save();

  if (!newUser) {
    return res.status(500).json({ error: "Server error, please try again..." });
  }

  return res
    .status(200)
    .json({
      success:
        "Your user account has been created. Please login for the first time!"
    });
};
