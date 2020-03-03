const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../../../models/User");
const { NODE_ENV, BASE_URL } = require("../../../config/env");
const { hashPassword } = require("../../../helpers/password");

module.exports = async function(req, res) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    const error = errors[0].msg;
    return res.status(400).json({ error });
  }

  const { email, name, password } = req.body;

  const currentUser = await User.findOne({ email });

  if (currentUser) {
    return res.status(400).json({
      error: "A user account exists with the provided email address."
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await new User({
    email: email.toLowerCase(),
    name,
    password: hashedPassword
  }).save();

  if (!newUser) {
    return res.status(500).json({ error: "Server error, please try again..." });
  }

  const secret = newUser.email + "-" + newUser.createdAt;
  const token = await jwt.sign(
    {
      user: {
        id: newUser.id,
        email: newUser.email
      }
    },
    secret
  );

  const verifyEmailUrl = `${BASE_URL}/verify/${newUser.id}/${token}`;

  const message = {
    from: "no_reply@bbarbour.dev",
    to: email,
    subject: "Welcome to *APP NAME*. Please verify your email address.",
    html: `<p>Please use the following to link verify your email adddress.</p> <p><a href="${verifyEmailUrl}">${verifyEmailUrl}</a></p>`
  };

  if (NODE_ENV === "production") {
    // send email via Nodemailer or other email service.
  } else {
    console.log(verifyEmailUrl);
  }

  return res.status(201).json({
    success: `Your user account has been created and a verification email sent to ${email}.`
  });
};
