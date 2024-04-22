const userModal = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  try {
    const { firstname, surname, email, password, dateofbirth, gender } =
      req.body;
    const data = { firstname, surname, email, password, dateofbirth, gender };
    if (!data) {
      return res.status(400).send({
        success: false,
        message: "Plase fill all field",
      });
    }

    //exisiting user

    const exisitingUser = await userModal.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exisits",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    //Save user

    const user = new userModal({
      firstname,
      surname,
      email,
      password: hashPassword,
      dateofbirth,
      gender,
    });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log("Error in Register Controller", error);
    return res.status(500).send({
      success: false,
      message: "An internal server error occurred.",
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please Provide All Field.",
      });
    }
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is Not Register.",
      });
    }
    //Password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid email or password.",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      user,
    });
  } catch (error) {
    console.log("Error in login Controller", error);
    return res.status(500).send({
      success: false,
      message: "An internal server error occurred.",
    });
  }
};

exports.forgetController = (req, res) => {};
