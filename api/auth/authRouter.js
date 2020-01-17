const express = require("express");
const router = express.Router();

const validateLogin = require("./validators/validateLogin");
const handleAuth = require("./handlers/handleAuth");
const handleLogin = require("./handlers/handleLogin");
const auth = require("../../middleware/auth");

router.get("/", auth, (req, res) => handleAuth(req, res));

router.post("/", validateLogin, (req, res) => handleLogin(req, res));

module.exports = router;
