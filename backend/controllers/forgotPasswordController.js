const User = require("../models/user");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcrypt");

// 1️⃣ Send OTP
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("📧 Forgot Password Request for email:", email);

    if (!email) {
      console.log("❌ Email not provided");
      return res.status(400).json({ msg: "Email is required" });
    }

    // Check all users in database
    const allUsers = await User.find({});
    console.log("📊 Total users in database:", allUsers.length);
    console.log("📋 All emails in database:", allUsers.map(u => u.email));

    const user = await User.findOne({ email });
    console.log("🔍 User search result:", user ? "Found" : "Not Found");
    
    if (!user) {
      console.log("❌ User not found in database for email:", email);
      return res.status(404).json({ msg: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 5 * 60 * 1000; // 5 min
    await user.save();

    console.log(`✅ Generated OTP ${otp} for user ${email}`);

    await sendMail(email, otp);

    console.log("✅ OTP sent successfully to:", email);
    res.json({ msg: "OTP sent to email" });

  } catch (err) {
    console.error("❌ SEND OTP ERROR:", err);
    res.status(500).json({ msg: "OTP send failed", error: err.message });
  }
};

// 2️⃣ Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log("🔐 Verify OTP Request:");
    console.log("   Email:", email);
    console.log("   OTP received:", otp, "Type:", typeof otp);

    if (!email || !otp) {
      console.log("❌ Missing email or OTP");
      return res.status(400).json({ msg: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ msg: "User not found" });
    }

    console.log("   OTP in DB:", user.resetOtp, "Type:", typeof user.resetOtp);
    console.log("   OTP Expiry:", user.resetOtpExpiry);
    console.log("   Current Time:", Date.now());
    console.log("   Is Expired?", user.resetOtpExpiry < Date.now());

    // Convert both to string for comparison
    const otpMatch = String(user.resetOtp) === String(otp);
    const isExpired = user.resetOtpExpiry < Date.now();

    console.log("   OTP Match?", otpMatch);
    console.log("   Is Expired?", isExpired);

    if (!otpMatch) {
      console.log("❌ OTP does not match");
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (isExpired) {
      console.log("❌ OTP expired");
      return res.status(400).json({ msg: "OTP expired" });
    }

    console.log("✅ OTP verified successfully");
    res.json({ msg: "OTP verified" });

  } catch (err) {
    console.error("❌ VERIFY OTP ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 3️⃣ Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    console.log("🔑 Reset Password Request for:", email);

    if (!email || !newPassword) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ msg: "Email and new password are required" });
    }

    if (newPassword.length < 6) {
      console.log("❌ Password too short");
      return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ msg: "User not found" });
    }

    // Store old password hash for logging (don't send to client)
    const oldPasswordHash = user.password;
    console.log("   Old password hash:", oldPasswordHash.substring(0, 20) + "...");

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log("   New password hash:", hashedPassword.substring(0, 20) + "...");

    // Update password and clear OTP
    user.password = hashedPassword;
    user.resetOtp = null;
    user.resetOtpExpiry = null;
    await user.save();

    console.log("✅ Password reset successful");
    console.log("   Old password is now INVALID");
    console.log("   New password is now ACTIVE");

    res.json({ msg: "Password reset successful" });

  } catch (err) {
    console.error("❌ RESET PASSWORD ERROR:", err);
    res.status(500).json({ msg: "Password reset failed" });
  }
};
