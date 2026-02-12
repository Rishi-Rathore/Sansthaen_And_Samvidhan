const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller");

// ✅ VERY IMPORTANT: function reference, NOT function call

router.post("/login", authController.login);

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);

module.exports = router;

exports.login = async (req, res) => {
  res.status(200).json({ msg: "Login API working" });
};

