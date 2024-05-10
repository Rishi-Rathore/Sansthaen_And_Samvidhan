require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");               // ✅ ADD THIS

const authRoutes = require("./routes/authroutes");

const app = express();

// ✅ MIDDLEWARES
app.use(cors());                            // ✅ ADD THIS
app.use(express.json());


// routes
app.use("/api/auth", authRoutes);

const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");
app.use("/api/forgot-password", forgotPasswordRoutes);

// start server (LAST)
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log("Server running on port " + PORT);
    });
  })
  .catch(err => console.error(err));


