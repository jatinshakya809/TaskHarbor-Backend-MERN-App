import express from "express";
import { List } from "../models/list.js";
import { User } from "../models/user.js";
import mongoose from "mongoose";
const router = express.Router();

//create
router.post("/addtask", async (req, res) => {
  try {
    const { title, body, id } = req.body;

    if (!title || !body || !id) {
      return res.status(200).json({
        message: "To add task fill all details",
        success: false,
      });
    }

    let existingUser = await User.findById(id);

    if (existingUser) {
      const list = await List.create({
        title,
        body,
        user: existingUser,
      });
      existingUser.list.push(list);
      await existingUser.save();
      return res.status(200).json({
        message: "Successfully added task",
        success: true,
        list,
      });
    }
    return res.status(400).json({
      message: "Cannot add Task",
      success: false,
    });
  } catch (error) {
    console.log("Error h addtask me", error);
  }
});

//update
router.put("/updatetask/:Taskid", async (req, res) => {
  try {
    const { title, body, id } = req.body;
    if (!title || !body || !id) {
      return res.status(200).json({
        message: "To add task fill all details",
        success: false,
      });
    }
    let existingUser = await User.findById(id);

    if (existingUser) {
      const updatedList = await List.findByIdAndUpdate(req.params.Taskid, {
        title,
        body,
      });
      if (updatedList) {
        return res.status(200).json({
          message: "Task Updated Successfully",
          success: true,
          updatedList,
        });
      } else {
        return res.status(404).json({
          message: "Task not found",
          success: false,
        });
      }
    }
  } catch (error) {
    console.log("Error in update Controller", error);
    return res.status(500).json({
      message: "Error in update Controller",
      success: false,
    });
  }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(200).json({
        message: "To add task fill all details",
        success: false,
      });
    }

    const existingUser = await User.findByIdAndUpdate(id, {
      $pull: { list: req.params.id },
    });
    if (existingUser) {
      const deleteTask = await List.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        message: "Task deleted successfully",
        success: true,
        deleteTask,
      });
    }
  } catch (error) {
    console.log("Error in Delete Controller", error);
    return res.status(500).json({
      message: "Error in Delete Controller",
      success: false,
    });
  }
});

//getAllTask
router.get("/getAllTask/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });
    if (list.length !== 0) {
      return res.status(200).json({
        success: true,
        message: "Successfully getting list",
        list,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No task Added",
      });
    }
  } catch (error) {
    console.log("Error in get ALl Controller", error);
    return res.status(500).json({
      message: "Error in get ALl Controller",
      success: false,
    });
  }
});

// return res.status(400).json({
//   message: "failed to update task",
//   success: false,
// });

//   return res.status(200).json({
//     message: "Task Updated Successfully",
//     success: true,
//     updatedList,
//   });
export default router;
