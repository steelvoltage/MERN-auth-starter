const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const validatePassReset = require("./validators/validatePassReset");
const validatePassNew = require("./validators/validatePassNew");
const validateUserNew = require("./validators/validateUserNew");
const validateChangeName = require("./validators/validateChangeName");
const validateChangeEmail = require("./validators/validateChangeEmail");
const validateChangePass = require("./validators/validateChangePass");

const handlePassReset = require("./handlers/handlePassReset");
const handlePassNew = require("./handlers/handlePassNew");
const handleUserNew = require("./handlers/handleUserNew");
const handleChangeName = require("./handlers/handleChangeName");
const handleChangeEmail = require("./handlers/handleChangeEmail");
const handleChangePass = require("./handlers/handleChangePass");

router.post("/reset-password", validatePassReset, (req, res) =>
  handlePassReset(req, res)
);

router.post("/reset-password/new", validatePassNew, (req, res) =>
  handlePassNew(req, res)
);

router.post("/new", validateUserNew, (req, res) => handleUserNew(req, res));

router.post("/change/name", auth, validateChangeName, (req, res) => {
  handleChangeName(req, res);
});

router.post("/change/email", auth, validateChangeEmail, (req, res) => {
  handleChangeEmail(req, res);
});

router.post("/change/password", auth, validateChangePass, (req, res) => {
  handleChangePass(req, res);
});

module.exports = router;
