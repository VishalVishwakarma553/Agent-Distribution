import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    if (!Name || !Email || !Password) {
      return res.status(400).json("All fields are required");
    }
    //Checking user already exist
    const userExistence = await User.findOne({ Email });
    if (userExistence) {
      return res.status(401).json({
        message: "User already exist with this email",
      });
    }
    //Hashing the password
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = new User({
      Name,
      Email,
      Password: hashedPassword,
    });
    await newUser.save();
    if (!newUser) {
      return res.status(500).json({
        messaage: "Internal Server Error",
      });
    }
    //generating token through jsonwebtoken
    const token = await jwt.sign(
      { userId: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "none",
        secure: true,
      }) 
      .json({
        message: "User created successfully",
        user: newUser,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      messaage: "Internal server error",
      error: error.messaage,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //Find user and verify password
    const userExistence = await User.findOne({ Email });
    if (!userExistence) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    //verify password using bcryptjs
    const isPasswordValid = bcrypt.compare(Password, userExistence.Password);
    if (!isPasswordValid) {
      return res.status("401").json({
        message: "Invalid credentials",
      });
    }
    //Generate token
    const token = jwt.sign(
      { userId: userExistence._id },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );
    //Send response
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "none",
        secure: true,
      }) 
      .json({
        message: "User logged in successfully",
        user: userExistence,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.messaage,
    });
  }
};

export const logout = (req, res) => {
  try {
    return res
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
