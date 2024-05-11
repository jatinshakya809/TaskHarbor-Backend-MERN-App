import mongoose from "mongoose";
import color from "colors";

export const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGOURL).then(() => {
      console.log("Connected to Database".bgGreen.white);
    });
  } catch (error) {
    console.log("Cannot connect to Database".bgRed, error);
    return res.status(400).json({
      success: false,
      message: "Cannot connect to Database",
    });
  }
};
