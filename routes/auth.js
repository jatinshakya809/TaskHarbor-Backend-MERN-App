import express from "express";
import { User } from "../models/user.js";
const router = express.Router();
import bcrypt from "bcryptjs";

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill all details",
      });
    }

    const checkAlreadyExisit = await User.findOne({ email });

    if (checkAlreadyExisit) {
      return res.status(401).json({
        success: false,
        message: "Already registered!! please Login",
      });
    }

    const genSalt = 10;

    const hashPass = await bcrypt.hash(password, genSalt);

    const user = await User.create({
      username,
      password: hashPass,
      email,
    });
    return res.status(200).json({
      success: true,
      message: "Register Successfully !! please signIn",
    });
  } catch (error) {
    console.log("Error h bhaiya Register me".bgRed, error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(402).json({
        success: false,
        message: "Fill all details",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(402).json({
        success: false,
        message: "User not find",
      });
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      return res.status(401).json({
        success: false,
        message: "Invalid Creadentials",
      });
    }

    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: `Logged in Successfully Welcome, ${user.username}`,
      user,
    });
  } catch (error) {
    console.log("Error in Signin controller", error);
    return res.status(500).json({
      success: true,
      message: `Internal Server error`,
    });
  }
});

export default router;
