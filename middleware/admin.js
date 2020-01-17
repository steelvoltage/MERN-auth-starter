const User = require("../models/User");

module.exports = async function(req, res, next) {
  const user = await User.findById(req.user.id).select("isAdmin");
  if (!user.isAdmin) {
    return res.status(401).json({ error: "Access denied." });
  }
  next();
};
