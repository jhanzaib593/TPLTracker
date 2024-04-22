const mongoose = require("mongoose");
const TrackingModal = require("../models/dataModal");
const userModal = require("../models/userModel");
const { uploadImage } = require("../config/storageImg");

//GET ALL BLOGS

exports.getAllTrackingController = async (req, res) => {
  try {
    const track = await TrackingModal.find({});
    return res.status(200).send({
      trackCount: track.length,
      success: true,
      message: "In All Tracking",
      track,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In All Tracking",
      success: false,
      error,
    });
  }
};

//Create BLOGS

exports.createAllTrackingController = async (req, res) => {
  try {
    // Destructure the relevant fields from the request body
    const { title, description, user } = req.body;
    console.log("req.body", req.body);
    // Check if required fields are provided
    if (!title || !description || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // Validate that the user is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Check if the user exists
    const existingUser = await userModal.findById(user);

    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    // Upload image (assuming you have a function named uploadImage)
    const imageData = await uploadImage(req.file);
    const image = imageData.url;
    console.log("imageData", imageData);
    // Create a new blog with the provided data
    const newBlog = new TrackingModal({ title, description, image, user });

    // Start a MongoDB session for transaction support
    // const session = await mongoose.startSession();
    // session.startTransaction();

    // Save the new blog within the session
    await newBlog.save();

    // // Save the updated user within the session
    // await existingUser.save({ session });

    // // Commit the transaction
    // await session.commitTransaction();

    // Send a success response
    return res.status(201).send({
      success: true,
      message: "Blog Created",
      newBlog,
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    return res.status(400).send({
      message: "Error while Creating Blog",
      success: false,
      error,
    });
  }
};
