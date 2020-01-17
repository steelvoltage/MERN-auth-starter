require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  ROOT_ADMIN_PASSWORD: process.env.ROOT_ADMIN_PASSWORD,
  BASE_URL: "http://localhost:3000"
};
