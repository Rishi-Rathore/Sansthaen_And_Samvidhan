require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");

async function createTestUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if user already exists
    const existingUser = await User.findOne({ email: "rishirathour758@gmail.com" });
    
    if (existingUser) {
      console.log("⚠️  User already exists!");
      console.log("Email:", existingUser.email);
      console.log("Username:", existingUser.username);
      process.exit(0);
    }

    // Create new user
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    const newUser = new User({
      username: "rishi",
      email: "rishirathour758@gmail.com",
      password: hashedPassword,
      isVerified: true,
      role: "user"
    });

    await newUser.save();
    
    console.log("✅ Test user created successfully!");
    console.log("📧 Email: rishirathour758@gmail.com");
    console.log("🔑 Password: password123");
    console.log("👤 Username: rishi");
    
    // Verify
    const allUsers = await User.find({});
    console.log("\n📊 Total users in database:", allUsers.length);
    console.log("📋 All emails:", allUsers.map(u => u.email));
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

createTestUser();
