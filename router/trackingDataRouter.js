const express = require("express");
const {
  getAllTrackingController,
  createAllTrackingController,
  updateAllTrackingController,
  deleteAllTrackingController,
  getBlogByIdController,
  userBlogsController,
} = require("../controllers/TrackingController");

const multer = require("multer");
const upload = multer({});

//router object

const router = express.Router();

//GET || all Tracking
router.get("/all-tracking", getAllTrackingController);

//PORT || Create Tracking
// router.post("/create-tracking", createAllTrackingController);
router.post(
  "/create-tracking",
  upload.single("image"),
  createAllTrackingController
);

//GET || Single blogs Details
router.get("/get-track/:id", getBlogByIdController);

//PUT || update Tracking
// router.put("/update-tracking/:id", updateAllTrackingController);

// //DELETE || delete Tracking
// router.delete("/delete-tracking/:id", deleteAllTrackingController);

//GET || User blog
router.get("/user-track/:id", userBlogsController);

module.exports = router;
