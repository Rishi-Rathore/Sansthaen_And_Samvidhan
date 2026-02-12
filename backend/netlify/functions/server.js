const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running on Netlify!',
    timestamp: new Date().toISOString()
  });
});

// Import routes
const authRoutes = require('../../routes/authroutes');
const forgotPasswordRoutes = require('../../routes/forgotPasswordRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/forgot-password', forgotPasswordRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    method: req.method,
    url: req.url
  });
});

// Serverless handler
const handler = serverless(app);

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectDB();
  return await handler(event, context);
};
