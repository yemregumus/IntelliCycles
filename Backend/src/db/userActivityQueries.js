const pool = require("./db");

// Return the current date.
const currentDate = () => new Date();

// Create a new user task
const createNewTask = (
  userId,
  name,
  description,
  dueDatetime,
  reminderDateTime,
  color,
  repeatInterval,
  complete
) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
        INSERT INTO userActivity (userid, type, name, description, due_datetime, create_datetime, reminder_datetime, color, repeat_interval, complete)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id;
      `;

    pool
      .query(insertActivityQuery, [
        userId,
        "task",
        name,
        description,
        dueDatetime,
        currentDate(),
        reminderDateTime,
        color,
        repeatInterval,
        complete,
      ])
      .then((result) => resolve(result.rows[0].id))
      .catch((error) =>
        reject(
          new Error(`Database error while creating user activity. ${error}`)
        )
      );
  });
};

// Create a new user reminder
const createNewReminder = (
  userId,
  name,
  reminderDateTime,
  color,
  repeatInterval
) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
        INSERT INTO userActivity (userid, type, name, create_datetime, reminder_datetime, color, repeat_interval)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;
      `;
    pool
      .query(insertActivityQuery, [
        userId,
        "reminder",
        name,
        currentDate(),
        reminderDateTime,
        color,
        repeatInterval,
      ])
      .then((result) => resolve(result.rows[0].id))
      .catch((error) =>
        reject(
          new Error(`Database error while creating user activity. ${error}`)
        )
      );
  });
};

// Create a new user habit
const createNewHabit = (
  userId,
  name,
  description,
  dueDatetime,
  reminderDateTime,
  color,
  repeatInterval,
  complete,
  streak
) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
        INSERT INTO userActivity (userid, type, name, description, due_datetime, create_datetime, reminder_datetime, color, repeat_interval, complete, streak)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id;
      `;
    pool
      .query(insertActivityQuery, [
        userId,
        "habit",
        name,
        description,
        dueDatetime,
        currentDate(),
        reminderDateTime,
        color,
        repeatInterval,
        complete,
        streak,
      ])
      .then((result) => resolve(result.rows[0].id))
      .catch((error) =>
        reject(
          new Error(`Database error while creating user activity. ${error}`)
        )
      );
  });
};

// Create a new user event
const createNewEvent = (
  userId,
  name,
  description,
  reminderDateTime,
  color,
  repeatInterval,
  startDateTime,
  endDateTime
) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
        INSERT INTO userActivity (userid, type, name, description, create_datetime, reminder_datetime, color, repeat_interval, start_datetime, end_datetime)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id;
      `;
    pool
      .query(insertActivityQuery, [
        userId,
        "event",
        name,
        description,
        currentDate(),
        reminderDateTime,
        color,
        repeatInterval,
        startDateTime,
        endDateTime,
      ])
      .then((result) => resolve(result.rows[0].id))
      .catch((error) =>
        reject(
          new Error(`Database error while creating user activity. ${error}`)
        )
      );
  });
};

// Get user activities by type for a specific user
const getUserActivities = (userId, type = null) => {
  return new Promise((resolve, reject) => {
    let getActivitiesQuery,
      queryParams = [userId];

    if (type) {
      getActivitiesQuery = `
        SELECT * FROM useractivity
        WHERE userid = $1 AND type = $2;
      `;
      queryParams.push(type);
    } else
      getActivitiesQuery = `
      SELECT * FROM useractivity
      WHERE userid = $1;
    `;

    pool
      .query(getActivitiesQuery, queryParams)
      .then((result) => {
        const activities = result.rows.map((row) => ({
          id: row.id,
          type: row.type,
          name: row.name,
          description: row.description,
          dueDateTime: row.due_datetime,
          createDateTime: row.create_datetime,
          reminderDateTime: row.reminder_datetime,
          color: row.color,
          repeatInterval: row.repeat_interval,
          complete: row.complete,
          streak: row.streak,
          startDateTime: row.start_datetime,
          endDateTime: row.end_datetime,
        }));

        resolve(activities);
      })
      .catch((error) =>
        reject(
          new Error(`Database error while getting user activities. ${error}`)
        )
      );
  });
};

// Get user activity by ID
const getUserActivityById = (activityId) => {
  return new Promise((resolve, reject) => {
    const getActivityQuery = `
        SELECT * FROM userActivity
        WHERE id = $1;
      `;
    pool
      .query(getActivityQuery, [activityId])
      .then((result) => {
        // Make sure the activity id is valid.
        if (!result.rowCount) {
          reject(new Error(`No activity found with id ${activityId}.`));
        }

        // Get the activity information.
        const activity = {
          type: result.rows[0].type,
          name: result.rows[0].name,
          description: result.rows[0].description,
          dueDateTime: result.rows[0].due_datetime,
          createDateTime: row.create_datetime,
          reminderDateTime: result.rows[0].reminder_datetime,
          color: result.rows[0].color,
          repeatInterval: result.rows[0].repeat_interval,
          complete: result.rows[0].complete,
          streak: result.rows[0].streak,
          startDateTime: result.rows[0].start_datetime,
          endDateTime: result.rows[0].end_datetime,
        };

        resolve(activity);
      })
      .catch((error) =>
        reject(
          new Error(`Database error while getting user activity. ${error}`)
        )
      );
  });
};

// Update a user activity
const updateUserActivity = (
  id,
  name,
  description,
  dueDateTime,
  reminderDateTime,
  color,
  repeatInterval,
  complete,
  startDateTime,
  endDateTime,
  streak
) => {
  return new Promise((resolve, reject) => {
    const updateActivityQuery = `
        UPDATE userActivity
        SET name = $1,
            description = $2,
            due_datetime = $3,
            reminder_datetime = $4,
            color = $5,
            repeat_interval = $6,
            complete = $7,
            start_datetime = $8,
            end_datetime = $9,
            streak = $10
        WHERE id = $11;
      `;
    pool
      .query(updateActivityQuery, [
        name,
        description,
        dueDateTime,
        reminderDateTime,
        color,
        repeatInterval,
        complete,
        startDateTime,
        endDateTime,
        streak,
        id,
      ])
      .then((result) => {
        if (!result.rowCount)
          reject(new Error(`No activity found with id ${id}.`));
        resolve(`Activity ${id} is updated successfully.`);
      })
      .catch((error) =>
        reject(
          new Error(`Database error while updating user activity. ${error}`)
        )
      );
  });
};

// Delete a user activity
const deleteUserActivity = (id) => {
  return new Promise((resolve, reject) => {
    const deleteActivityQuery = `
        DELETE FROM userActivity
        WHERE id = $1;
      `;
    pool
      .query(deleteActivityQuery, [id])
      .then((result) => {
        if (!result.rowCount)
          reject(new Error(`No activity found with id ${id}.`));
        resolve(`Activity ${id} deleted successfully.`);
      })
      .catch((error) =>
        reject(
          new Error(`Database error while deleting user activity. ${error}`)
        )
      );
  });
};

const updateHabitCompletion = async (activityId, userId, isCompleted) => {
  try {
    // Get the current date and time
    const now = new Date();

    // Update the habit completion status and completed_at timestamp
    const updateCompletionQuery = `
        UPDATE userActivity
        SET complete = $1,
            completed_at = $2
        WHERE id = $3 AND userid = $4
        RETURNING id, streak, completed_at;
      `;

    const result = await pool.query(updateCompletionQuery, [
      isCompleted,
      now,
      activityId,
      userId,
    ]);

    if (!result.rowCount)
      throw new Error(`No activity found with id ${activityId}.`);

    // Calculate the new streak count
    let newStreak = await calculateStreak(activityId, userId, now, isCompleted);

    // Update the streak count in the database
    const updateStreakQuery = `
        UPDATE userActivity
        SET streak = $1
        WHERE id = $2 AND userid = $3;
      `;

    await pool.query(updateStreakQuery, [newStreak, activityId, userId]);

    return `Habit ${activityId} is updated successfully with a streak count of ${newStreak}.`;
  } catch (error) {
    throw new Error(`Database error while updating habit completion. ${error}`);
  }
};

const calculateStreak = async (activityId, userId, now, isCompleted) => {
  try {
    if (!isCompleted) {
      return 0;
    }

    const getCompletionDatesQuery = `
        SELECT completed_at
        FROM userActivity
        WHERE id = $1 AND userid = $2 AND completed_at IS NOT NULL
        ORDER BY completed_at DESC;
      `;

    const result = await pool.query(getCompletionDatesQuery, [
      activityId,
      userId,
    ]);

    if (!result.rowCount) {
      return 1;
    }

    const completionDates = result.rows.map(
      (row) => new Date(row.completed_at)
    );
    let streak = 1;

    for (let i = 0; i < completionDates.length; i++) {
      const previousDate = completionDates[i + 1];
      const currentDate = completionDates[i];

      if (!previousDate) {
        break;
      }

      const diffTime = Math.abs(currentDate - previousDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak += 1;
      } else {
        break;
      }
    }

    return streak;
  } catch (error) {
    throw new Error(`Error calculating streak count: ${error}`);
  }
};

module.exports = {
  createNewTask,
  createNewHabit,
  createNewReminder,
  createNewEvent,
  getUserActivities,
  getUserActivityById,
  updateUserActivity,
  deleteUserActivity,
  updateHabitCompletion,
  calculateStreak,
};
