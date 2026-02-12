const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("📝 Register Request:", { username, email });

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      otp,
      otpExpire,
      isVerified: false
    });

    await newUser.save();
    console.log("✅ User created, sending OTP");

    // Send OTP
    await sendMail(email, otp);

    res.status(200).json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ msg: "Registration failed" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log("🔐 Verify OTP:", { email, otp });

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ msg: "User not found" });
    }

    if (String(user.otp) !== String(otp)) {
      console.log("❌ Invalid OTP");
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (user.otpExpire < Date.now()) {
      console.log("❌ OTP expired");
      return res.status(400).json({ msg: "OTP expired" });
    }

    // Mark as verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;
    await user.save();

    console.log("✅ OTP verified successfully");
    res.status(200).json({ msg: "OTP verified" });
  } catch (err) {
    console.error("❌ Verify OTP Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const loginIdentifier = email || username;

    console.log("🔑 Login Request for:", loginIdentifier);

    // Validate input
    if (!loginIdentifier || !password) {
      console.log("❌ Missing credentials");
      return res.status(400).json({ msg: "Username/Email and password are required" });
    }

    // Find user by email or username
    const user = await User.findOne({ 
      $or: [{ email: loginIdentifier }, { username: loginIdentifier }]
    });

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Check if verified
    if (!user.isVerified) {
      console.log("❌ User not verified");
      return res.status(401).json({ msg: "Please verify your email first" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("❌ Invalid password");
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("✅ Login successful");

    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ msg: "Login failed" });
  }
};
