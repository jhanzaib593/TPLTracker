const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is Reguired"],
    },
    surname: {
      type: String,
      required: [true, "SurName Is Reguired"],
    },
    email: {
      type: String,
      required: [true, "Email is Reguired"],
    },
    password: {
      type: String,
      required: [true, "Password is Reguired"],
    },
    dateofbirth: {
      type: Date,
      required: [true, "Date of birth is Reguired"],
    },
    gender: {
      type: String,
      required: [true, "Gender Name Is Reguired"],
    },
  },
  { timestamps: true }
);

const userModal = mongoose.model("User", userSchema);

module.exports = userModal;
