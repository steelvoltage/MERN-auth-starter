const jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const testEmail = require("../../../config/test-email");

const { NODE_ENV, BASE_URL } = require("../../../config/env");
const { validationResult } = require("express-validator");

module.exports = async function(req, res) {
  const { errors } = validationResult(req);
  const error = "Email address is invalid or account does not exist.";

  if (errors.length > 0) {
    return res.status(400).json({ error });
  }

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error });
  }

  const secret = user.password + "-" + user.createdAt;
  const token = await jwt.sign(
    {
      user: {
        id: user.id
      }
    },
    secret,
    { expiresIn: "1h" }
  );

  const passwordResetUrl = `${BASE_URL}/reset-password/${user.id}/${token}`;

  if (NODE_ENV === "development") {
    const transporter = await testEmail();
    const message = {
      from: "noreply@deepbluepolitics.com",
      to: email,
      subject: "Your password has been reset.",
      html: `<p>We heard you lost your password. Sorry about that! You can use the following link to reset your password. It expires in one hour.</p> <p><a href="${passwordResetUrl}">${passwordResetUrl}</a></p>`
    };
    console.log(message);
    await transporter.sendMail(message);
  }
  return res
    .status(200)
    .json({ success: "An email was sent with a link to reset your password." });
};
