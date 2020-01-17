const User = require("../../../models/User");
const checkValidId = require("../../../helpers/checkValidId");

module.exports = async function(req, res) {
  const idIsValid = checkValidId(req.user.id);
  if (!idIsValid) {
    return res
      .status(400)
      .json({ error: "Authentication error, please login and try again." });
  }
  const user = await User.findById(req.user.id).select("-password");
  return res.status(200).json(user);
};
