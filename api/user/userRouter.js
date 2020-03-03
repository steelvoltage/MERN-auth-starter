const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");

const validatePassReset = require("./validators/validatePassReset");
const validatePassNew = require("./validators/validatePassNew");
const validateUserNew = require("./validators/validateUserNew");
const validateChangeName = require("./validators/validateChangeName");
const validateChangeEmail = require("./validators/validateChangeEmail");
const validateChangePass = require("./validators/validateChangePass");
const validateVerifyEmail = require("./validators/validateVerifyEmail");

const handlePassReset = require("./handlers/handlePassReset");
const handlePassNew = require("./handlers/handlePassNew");
const handleUserNew = require("./handlers/handleUserNew");
const handleChangeName = require("./handlers/handleChangeName");
const handleChangeEmail = require("./handlers/handleChangeEmail");
const handleChangePass = require("./handlers/handleChangePass");
const handleVerifyEmail = require("./handlers/handleVerifyEmail");
const handleVerifyEmailMessage = require("./handlers/handleVerifyEmailMessage");

router.post("/new", validateUserNew, handleUserNew);

router.get("/verify-email", auth, handleVerifyEmailMessage);

router.patch("/verify-email", validateVerifyEmail, handleVerifyEmail);

router.patch("/reset-password", validatePassReset, handlePassReset);

router.patch("/reset-password/new", validatePassNew, handlePassNew);

router.patch("/change/name", auth, validateChangeName, handleChangeName);

router.patch("/change/email", auth, validateChangeEmail, handleChangeEmail);

router.patch("/change/password", auth, validateChangePass, handleChangePass);

module.exports = router;
