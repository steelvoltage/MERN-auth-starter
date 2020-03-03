const express = require("express");
const router = express.Router();

const validateLogin = require("./validators/validateLogin");
const handleAuth = require("./handlers/handleAuth");
const handleLogin = require("./handlers/handleLogin");
const auth = require("../../middleware/auth");

router.get("/", auth, handleAuth);

router.post("/", validateLogin, handleLogin);

module.exports = router;
