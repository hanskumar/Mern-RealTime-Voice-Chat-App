/**
 * Load Depandancies
*/
const express = require("express");
const router  = express.Router();

const Auth = require("../middlewares/check_Auth");
const AuthController        = require("../controllers/AuthController");

/**
 * ==================  Define All API End Points Here========================
*/


router.post("/authanticate",AuthController.authanticate);

router.post("/sendOtp",AuthController.sendOtp);

/*-------------------Login Routes with password or OTP---------------*/
router.post("/login",AuthController.login);


module.exports = router;