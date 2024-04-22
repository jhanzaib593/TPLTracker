const mongoose = require("mongoose");

const tackingDataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Reguired"],
    },
    description: {
      type: String,
      required: [true, "description Is Reguired"],
    },
    image: {
      type: String,
      required: [true, "Image is Reguired"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "User Id is required"],
    },
  },
  { timestamps: true }
);

const tackingDataModal = mongoose.model("Tracking Data", tackingDataSchema);

module.exports = tackingDataModal;
