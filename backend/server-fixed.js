require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check
app.get("/", (req, res) => {
  res.json({ 
    status: "Server is running!",
    timestamp: new Date().toISOString()
  });
});

// Import routes
const authRoutes = require("./routes/authroutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);

// 404 handler
app.use((req, res) => {
  console.log("❌ 404 - Route not found:", req.method, req.url);
  res.status(404).json({ 
    error: "Route not found",
    method: req.method,
    url: req.url,
    availableRoutes: {
      auth: "/api/auth/*",
      forgotPassword: "/api/forgot-password/*"
    }
  });
});

// Start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📧 Forgot Password: POST http://localhost:${PORT}/api/forgot-password/send-otp`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB error:", err.message);
    app.listen(PORT, () => {
      console.log(`⚠️  Server running on port ${PORT} (DB not connected)`);
    });
  });
