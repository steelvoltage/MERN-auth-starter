const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

module.exports = async function(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "Invalid authentication token." });
  }

  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid authentication token." });
  }
};
