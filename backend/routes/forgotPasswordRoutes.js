const express = require("express");
const router = express.Router();
const forgotController = require("../controllers/forgotPasswordController");

// Test route
router.get("/test", (req, res) => {
  res.json({ 
    message: "Forgot password routes are working!",
    availableRoutes: [
      "POST /send-otp",
      "POST /verify-otp", 
      "POST /reset-password"
    ]
  });
});

// Main routes
router.post("/send-otp", forgotController.sendOtp);
router.post("/verify-otp", forgotController.verifyOtp);
router.post("/reset-password", forgotController.resetPassword);

module.exports = router;








