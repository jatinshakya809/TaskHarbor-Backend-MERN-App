import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email uniqueness
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    list: [
      {
        type: mongoose.Types.ObjectId,
        ref: "List",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
