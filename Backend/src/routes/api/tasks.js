const express = require("express");
const router = express.Router();
const resMessage = require("../responseFormat");
const { createUserActivity, getUserActivitiesByType, getUserActivityById, updateUserActivity, deleteUserActivity } = require("../../db");

// Create a new task
router.post("/createTask", async (req, res) => {
  const { userid, name, description, due_date, reminder_datetime, color, repeat_interval, complete, start_time, end_time, streak } = req.body;

  console.log(`Request to create a task the user ${userid} with name ${name} and description ${description}.`);
  try {
    const activityId = await createUserActivity(userid, "task", name, description, due_date, reminder_datetime, color, repeat_interval, complete, start_time, end_time, streak);
    res.status(201).json(resMessage(true, "Task created successfully", { activityId }));
  } catch (error) {
    console.log(error);
    res.status(500).json(resMessage(false, error.message));
  }
});

// Get tasks for a specific user
router.get("/user/:userid", async (req, res) => {
  const { userid } = req.params;

  try {
    const tasks = await getUserActivitiesByType(userid, "task");
    res.status(200).json(resMessage(true, "Tasks retrieved successfully", { tasks }));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

// Get a specific task by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await getUserActivityById(id);
    res.status(200).json(resMessage(true, "Task retrieved successfully", { task }));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, due_date, reminder_datetime, color, repeat_interval, complete, start_time, end_time, streak } = req.body;

  try {
    await updateUserActivity(id, "task", name, description, due_date, reminder_datetime, color, repeat_interval, complete, start_time, end_time, streak);
    res.status(200).json(resMessage(true, "Task updated successfully"));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await deleteUserActivity(id);
    res.status(200).json(resMessage(true, "Task deleted successfully"));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

module.exports = router;
