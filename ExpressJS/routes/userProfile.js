const express = require("express");
const router = express.Router();
const userProfileController = require("../controller/userProfileController");

// routes
router.post("/", userProfileController.getUserDetails);
router.get("/", userProfileController.getAllUserDetails);
router.post("/user", userProfileController.createUser);
router.post("/user/remove", userProfileController.removeUser);
router.put("/admin/update", userProfileController.updateAdminDetails);
router.post(
  "/user/video",
  userProfileController.upload,
  userProfileController.userFireDetectionVideo
);
router.get("/user/video", userProfileController.getAllUserVideos);
module.exports = router;
