const express = require("express");
const router = express.Router();
const forgotController = require("../controllers/forgotPasswordController");

router.post("/send-otp", forgotController.sendOtp);
router.post("/verify-otp", forgotController.verifyOtp);
router.post("/reset-password", forgotController.resetPassword);

module.exports = router;
