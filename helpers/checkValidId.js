const mongoose = require("mongoose");

module.exports = function(id) {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    return false;
  }
  return true;
};
