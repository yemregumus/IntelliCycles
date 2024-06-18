const express = require("express");
const router = express.Router();
const resMessage = require("../responseFormat");
const {
  createNewTask,
  createNewHabit,
  createNewReminder,
  createNewEvent,
  getUserActivities,
  getUserInfo,
  getUserActivityById,
  deleteUserActivity,
} = require("../../db");

const activityType = ["task", "reminder", "habit", "event"];

// Create a new task
router.post("/:type/:userId", async (req, res) => {
  // Get the id of the user and the type of the user's activity.
  const { type, userId } = req.params;

  console.log(`Request to create a ${type} for ${userId}.`);

  // A function to call whenever the data require is insufficient.
  const invalidRequest = () => {
    return res
      .status(400)
      .json(
        resMessage(
          false,
          `Insufficient information received. Please check the requirements of this api.`
        )
      );
  };

  // Make sure the id of the user is passed.
  // Make sure the type passed is one of the accepted.
  if (!userId || !activityType.includes(type)) return invalidRequest();

  try {
    // Make sure the user id is valid.
    await getUserInfo(userId);
  } catch (error) {
    return res
      .status(400)
      .json(
        resMessage(false, `Invalid user id. No user found with id ${userId}.`)
      );
  }

  // Get all the data from the request body.
  const {
    name,
    description,
    dueDateTime,
    reminderDatetime,
    color,
    repeatInterval,
    complete,
    startDateTime,
    endDateTime,
    streak,
  } = req.body;

  let activityId;

  try {
    // Make sure all the required data is present according to the activity type.
    if (type === "task") {
      if (
        !name ||
        !description ||
        !dueDateTime ||
        !reminderDatetime ||
        !color ||
        !repeatInterval ||
        !complete
      )
        return invalidRequest();
      activityId = await createNewTask(
        userId,
        name,
        description,
        dueDateTime,
        reminderDatetime,
        color,
        repeatInterval,
        complete
      );
    } else if (type === "reminder") {
      if (!name || !reminderDatetime || !color || !repeatInterval)
        return invalidRequest();
      activityId = await createNewReminder(
        userId,
        name,
        reminderDatetime,
        color,
        repeatInterval
      );
    } else if (type === "habit") {
      if (
        !name ||
        !description ||
        !dueDateTime ||
        !reminderDatetime ||
        !color ||
        !repeatInterval ||
        !complete ||
        !streak
      )
        return invalidRequest();
      activityId = await createNewHabit(
        userId,
        name,
        description,
        dueDateTime,
        reminderDatetime,
        color,
        repeatInterval,
        complete,
        streak
      );
    } else if (type === "event") {
      if (
        !name ||
        !description ||
        !startDateTime ||
        !endDateTime ||
        !reminderDatetime ||
        !color ||
        !repeatInterval
      )
        return invalidRequest();
      activityId = await createNewEvent(
        userId,
        name,
        description,
        reminderDatetime,
        color,
        repeatInterval,
        startDateTime,
        endDateTime
      );
    }

    res
      .status(200)
      .json(resMessage(true, `New ${type} is created.`, activityId));
  } catch (error) {
    console.log(error);
    res.status(500).json(resMessage(false, error.message));
  }
});

// Get tasks for a specific user
router.get("/user/:userId", async (req, res) => {
  // Get the user id.
  const { userId } = req.params;
  // Get the type query if passed.
  const { type } = req.query || null;

  // Make sure the userId exist.
  if (!userId || (type && !activityType.includes(type)))
    return res
      .status(400)
      .json(
        resMessage(
          false,
          `Insufficient information received. Please check the requirements of this api.`
        )
      );

  // Make sure the userId is valid.
  try {
    // Make sure the user id is valid.
    await getUserInfo(userId);
  } catch (error) {
    return res
      .status(400)
      .json(
        resMessage(false, `Invalid user id. No user found with id ${userId}.`)
      );
  }

  try {
    // Try to get the user activity/specific activity for the specified user.
    const userActivities = await getUserActivities(userId, type);

    res
      .status(200)
      .json(
        resMessage(
          true,
          `${userActivities.length} user activities sent.`,
          userActivities
        )
      );
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

// Get a specific task by ID
router.get("/:id", async (req, res) => {
  // Get the activity id.
  const { id } = req.params;

  // Make sure the activity id is not null.
  if (!id)
    return res
      .status(400)
      .json(
        resMessage(
          false,
          `Insufficient information received. Please check the requirements of this api.`
        )
      );

  // Try to get the activity by passing the id.
  try {
    const activity = await getUserActivityById(id);
    res.status(200).json(resMessage(true, "Activity send.", { activity }));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    due_date,
    reminder_datetime,
    color,
    repeat_interval,
    complete,
    start_time,
    end_time,
    streak,
  } = req.body;

  try {
    await updateUserActivity(
      id,
      "task",
      name,
      description,
      due_date,
      reminder_datetime,
      color,
      repeat_interval,
      complete,
      start_time,
      end_time,
      streak
    );
    res.status(200).json(resMessage(true, "Task updated successfully"));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  // Get activity id.
  const { id } = req.params;

  // Make sure the id is not null.
  if (!id)
    return res
      .status(400)
      .json(
        resMessage(
          false,
          `Insufficient information received. Please check the requirements of this api.`
        )
      );

  // Try to delete the activity.
  try {
    await deleteUserActivity(id);
    res.status(200).json(resMessage(true, "Activity deleted successfully"));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

module.exports = router;
