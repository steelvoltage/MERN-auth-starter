const jwt = require("jsonwebtoken");
const User = require("../../../models/User");

const { validationResult } = require("express-validator");
const { checkPassword } = require("../../../helpers/password");
const { JWT_SECRET } = require("../../../config/env");

module.exports = async function(req, res) {
  const { errors } = validationResult(req);
  const error = "Invalid login credentials.";

  if (errors.length > 0) {
    return res.status(400).json({ error });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error });
  }

  const passwordsMatch = await checkPassword(password, user.password);

  if (!passwordsMatch) {
    return res.status(401).json({ error });
  }

  const payload = {
    user: {
      id: user.id
    }
  };

  try {
    const authToken = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1d"
    });
    return res.status(200).json({ success: "Login successful!", authToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error, please try again..." });
  }
};
