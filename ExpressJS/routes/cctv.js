const express = require("express");
const router = express.Router();
const cctvController = require("../controller/cctvController");

// routes
router.put("/:email", cctvController.updateCCTVIps);

module.exports = router;
