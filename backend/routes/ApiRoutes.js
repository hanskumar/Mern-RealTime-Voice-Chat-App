/**
 * Load Depandancies
*/
const express = require("express");
const router  = express.Router();

const AuthController        = require("../controllers/AuthController");
const ActivateController   = require("../controllers/ActivateController");

const isAuth = require("../middlewares/check_Auth");

/**
 * ==================  Define All API End Points Here========================
*/


router.post("/sendOtp",AuthController.sendOtp);

router.post("/verifyOtp",AuthController.verifyOtp);

router.get("/refreshToken",AuthController.refreshToken);

/*-------------------Seme Protected Route---------------*/
router.post("/setName",isAuth,ActivateController.updateName);

router.post("/setAvatar",isAuth,ActivateController.updateAvatar);


module.exports = router;