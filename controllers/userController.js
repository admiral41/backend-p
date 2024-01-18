const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  console.log(req.body);

  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.json({
      success: false,
      message: "Please enter all the fields",
    });
  }

  try {
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "The user already exists",
      });
    }


    const newUser = new Users({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "The user has been created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server Error");
  }
};

const loginUser = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields",
    });
  }
  try {
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "The user does not exist",
      });
    }

    const databasePassword = user.password;

    if (!databasePassword) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      success: true,
      message: "Login successfull",
      token: token,
      userData: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
};
