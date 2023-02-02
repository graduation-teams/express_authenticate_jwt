const express = require("express");
const router = express.Router();

const {
    registerValidate,
    loginValidate,
} = require("../app/validators/authValidator");
const authController = require("../app/controllers/authController");

router.post("/signup", registerValidate(), authController.signup);
router.post("/signin", loginValidate(), authController.signin);

module.exports = router;
