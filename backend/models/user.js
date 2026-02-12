const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      default: "user"
    },

    // ✅ REGISTER OTP
    otp: String,
    otpExpire: Date,

    isVerified: {
      type: Boolean,
      default: false
    },

    // 🔐 FORGOT PASSWORD OTP (NEW)
    resetOtp: String,
    resetOtpExpiry: Date
  },
  { timestamps: true }
);

// overwrite error safe
module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);
