// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/databaseConnection"); // Ensure this path is correct
const cors = require("cors");
const mongoose = require("mongoose");

// create express app
const app = express();

// Connect to the database and start the server
async function startServer() {
  try {
    await connectDB(); // Wait for the database connection to be established

    // Middleware
    app.use(
      cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    app.use("/videos", express.static("videos"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Routes
    app.use("/login", require("./routes/auth"));
    app.use("/getProfileDetails", require("./routes/userProfile"));
    app.use("/updateCCTVIps", require("./routes/cctv"));

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
}

startServer();
