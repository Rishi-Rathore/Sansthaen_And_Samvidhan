const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");

// ✅ VERY IMPORTANT: function reference, NOT function call
router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);

module.exports = router;
