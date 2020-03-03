const jwt = require("jsonwebtoken");

const User = require("../../../models/User");
const checkValidId = require("../../../helpers/checkValidId");
const { NODE_ENV, BASE_URL } = require("../../../config/env");

module.exports = async function(req, res) {
  const error =
    "User account error, please logout and back in and then try again.";

  const idIsValid = checkValidId(req.user.id);
  if (!idIsValid) {
    return res.status(400).json({ error });
  }

  const user = await User.findById(req.user.id);

  if (user.emailVerified) {
    return res.status(400).json({ error });
  }

  const secret = user.email + "-" + user.createdAt;
  const token = await jwt.sign(
    {
      user: {
        id: user.id,
        email: user.email
      }
    },
    secret
  );

  const verifyEmailUrl = `${BASE_URL}/verify/${user.id}/${token}`;

  const message = {
    from: "no_reply@bbarbour.dev",
    to: user.email,
    subject: "*APP NAME* - Please verify your email address.",
    html: `<p>You have yet to verify your email or have changed the email we have on file. Please use to following link to verify.</p> <p><a href="${verifyEmailUrl}">${verifyEmailUrl}</a></p>`
  };

  if (NODE_ENV === "production") {
    // send email via Nodemailer or other email service.
  } else {
    console.log(verifyEmailUrl);
  }

  return res.status(200).json({
    success: `Verification email succcessfully sent.`
  });
};
