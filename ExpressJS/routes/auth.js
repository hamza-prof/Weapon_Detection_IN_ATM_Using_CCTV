const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

// routes
router.post("/", authController.login);

module.exports = router;
