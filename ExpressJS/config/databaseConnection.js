// config/databaseConnection.js
const mongoose = require("mongoose");

async function connectDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
}


module.exports = connectDB;
