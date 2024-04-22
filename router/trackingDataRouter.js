const express = require("express");
const {
  getAllTrackingController,
  createAllTrackingController,
  updateAllTrackingController,
  deleteAllTrackingController,
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
//PUT || update Tracking
// router.put("/update-tracking/:id", updateAllTrackingController);

// //DELETE || delete Tracking
// router.delete("/delete-tracking/:id", deleteAllTrackingController);

module.exports = router;
