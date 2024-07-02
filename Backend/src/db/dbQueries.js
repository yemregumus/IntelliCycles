const pool = require("./db");
const fs = require("fs");

const createTables = () => {
  return new Promise((resolve, reject) => {
    const createTableQuery = fs.readFileSync("src/db/tables.sql", "utf8");
    pool
      .query(createTableQuery)
      .then(resolve("All tables created."))
      .catch(reject(new Error("Database error while creating all the tables.")));
  });
};

const cleanTable = () => {
  return new Promise((resolve, reject) => {
    const dropTablesQuery = 'DELETE FROM "user";';
    pool
      .query(dropTablesQuery)
      .then(() => {
        resolve();
      })
      .catch(() => reject(new Error("Database error while clearning all the tables.")));
  });
};

const isUniqueUser = async (username, email) => {
  return new Promise((resolve, reject) => {
    pool
      .query('SELECT username, email FROM "user" WHERE username = $1 OR email = $2', [username, email])
      .then((result) => {
        if (!result.rowCount) resolve(true);
        if (result.rows[0].username === username) reject(new Error(`The username is already taken.`));
        reject(new Error(`The email is already taken.`));
      })
      .catch((error) => reject(new Error(`Database error while checking uniqueness: ${error}`)));
  });
};

const getUserPassword = (id) => {
  return new Promise((resolve, reject) => {
    let where = "id";
    if (isNaN(id)) where = "username";

    // Query to fetch user data from the database based on the provided username/id.
    const query = `SELECT password FROM "user" WHERE ${where} = $1`;
    pool
      .query(query, [id])
      .then((result) => {
        if (!result.rowCount) reject(new Error(`No user found with the username ${username}.`));
        resolve(result.rows[0].password);
      })
      .catch((error) => reject(new Error(`Error getting the user password: ${error}`)));
  });
};

const getUserId = (username) => {
  return new Promise((resolve, reject) => {
    // Query to fetch user id from the database.
    const getUserIdQuery = `SELECT id FROM "user" WHERE username = $1`;
    pool
      .query(getUserIdQuery, [username])
      .then((result) => {
        if (!result.rowCount) reject(new Error(`No user found with the username ${username}.`));
        resolve(result.rows[0].id);
      })
      .catch((error) => reject(new Error(`Error getting the user password: ${error}`)));
  });
};

const addNewUser = (firstName, lastName, username, email, password, dateOfBirth, avatar) => {
  return new Promise((resolve, reject) => {
    const insertUserQuery = `
        INSERT INTO "user" (firstname, lastname, username, email, password, dateofbirth, avatar)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, username;
        `;
    pool
      .query(insertUserQuery, [firstName, lastName, username, email, password, dateOfBirth, avatar])
      .then((result) => {
        const { id, username } = result.rows[0];
        resolve({ _id: id, _username: username });
      })
      .catch((error) => reject(new Error(`Database error while adding ${firstName}. ${error}`)));
  });
};

const updateUser = (id, firstName, lastName, email, avatar) => {
  return new Promise((resolve, reject) => {
    const updateUserQuery = `
        UPDATE "user" 
        SET firstname = $1,
            lastname = $2,
            email = $3,
            avatar = $4
        WHERE id = $5;
        `;
    pool
      .query(updateUserQuery, [firstName, lastName, email, avatar, id])
      .then((result) => {
        if (!result.rowCount) reject(new Error(`No user found with id ${id}.`));
        resolve(`${firstName}'s profile information is updated.`);
      })
      .catch((error) => {
        reject(new Error(`Database error while updathing ${firstName}. ${error}`));
      });
  });
};

const updateUserPassword = (id, newPassword) => {
  return new Promise((resolve, reject) => {
    const updateUserPasswordQuery = `
        UPDATE "user" 
        SET password = $1
        WHERE id = $2;
        `;
    pool
      .query(updateUserPasswordQuery, [newPassword, id])
      .then((result) => {
        if (!result.rowCount) reject(new Error(`No user found with id ${id}.`));
        resolve(`${id}'s password is updated.`);
      })
      .catch((error) => {
        reject(new Error(`Database error while updathing ${id}'s password. ${error}`));
      });
  });
};

const getUserInfo = (id) => {
  return new Promise((resolve, reject) => {
    const getUserInfoQuery = `
    SELECT firstname, lastname, username, email, dateofbirth, avatar 
    FROM "user" WHERE id=${id};
    `;
    pool
      .query(getUserInfoQuery)
      .then((result) => {
        if (!result.rowCount) reject(new Error(`Database error. Invalid user id, ${id}.`));
        const { firstname, lastname, username, email, dateofbirth, avatar } = result.rows[0];
        resolve({
          firstName: firstname,
          lastName: lastname,
          username: username,
          email: email,
          dateOfBirth: dateofbirth,
          avatar: avatar,
        });
      })
      .catch((error) => reject(new Error(`Database error while getting user info. ${error}`)));
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const deleteUserQuery = `
    DELETE FROM "user" 
    WHERE id=${id};
    `;
    pool
      .query(deleteUserQuery)
      .then((result) => {
        if (!result.rowCount) reject(new Error(`Database error. No user found with ${id}.`));
        resolve(`User ${id} deleted successfully.`);
      })
      .catch((error) => reject(new Error(`Database error while deleting the user. ${error}`)));
  });
};

const getMembershipInfo = (id) => {
  return new Promise((resolve, reject) => {
    const getMembershipInfoQuery = `
    SELECT membershiptype
    FROM membership 
    WHERE userid=${id};
    `;
    pool
      .query(getMembershipInfoQuery)
      .then((result) => {
        if (!result.rowCount) reject(new Error(`No user found with id ${id}.`));
        const { membershiptype } = result.rows[0];
        resolve(membershiptype);
      })
      .catch((error) => reject(new Error(`Database error while getting user info. ${error}`)));
  });
};

const addNewMembership = (id) => {
  return new Promise((resolve, reject) => {
    const addMembershipQuery = `
        INSERT INTO membership (userid, membershiptype)
        VALUES ($1, $2);
        `;
    pool
      .query(addMembershipQuery, [id, "free"])
      .then((result) => {
        if (!result.rowCount) reject(new Error(`User ${id} already has a membership.`));
        resolve(`${id}'s membership is added.`);
      })
      .catch((error) => {
        reject(new Error(`Database error while adding ${id}'s membership. ${error}`));
      });
  });
};

const updateMembership = (id, membershipType) => {
  return new Promise((resolve, reject) => {
    const updateMembershipQuery = `
        UPDATE membership
        SET membershiptype = $1
        WHERE userid = $2;
        `;
    pool
      .query(updateMembershipQuery, [membershipType, id])
      .then((result) => {
        if (!result.rowCount) reject(new Error(`No user found with id ${id}.`));
        resolve(`${id}'s membership is updated.`);
      })
      .catch((error) => {
        reject(new Error(`Database error while updathing ${id}'s membership. ${error}`));
      });
  });
};

// Create a new user task
const createNewTask = (userId, name, description, dueDatetime, reminderDateTime, color, repeatInterval, complete) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
      INSERT INTO userActivity (userid, type, name, description, due_datetime, reminder_datetime, color, repeat_interval, complete)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id;
    `;

    pool
      .query(insertActivityQuery, [userId, "task", name, description, dueDatetime, reminderDateTime, color, repeatInterval, complete])
      .then((result) => resolve(result.rows[0].id))
      .catch((error) => reject(new Error(`Database error while creating user activity. ${error}`)));
  });
};

// Create a new user reminder
const createNewReminder = (userId, name, reminderDateTime, color, repeatInterval) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
      INSERT INTO userActivity (userid, type, name, reminder_datetime, color, repeat_interval)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    pool
      .query(insertActivityQuery, [userId, "reminder", name, reminderDateTime, color, repeatInterval])
      .then((result) => resolve(result.rows[0].id))
      .catch((error) => reject(new Error(`Database error while creating user activity. ${error}`)));
  });
};

// Create a new user habit
const createNewHabit = (userId, name, description, dueDatetime, reminderDateTime, color, repeatInterval, complete, streak) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
      INSERT INTO userActivity (userid, type, name, description, due_datetime, reminder_datetime, color, repeat_interval, complete, streak)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id;
    `;
    pool
      .query(insertActivityQuery, [userId, "habit", name, description, dueDatetime, reminderDateTime, color, repeatInterval, complete, streak])
      .then((result) => resolve(result.rows[0].id))
      .catch((error) => reject(new Error(`Database error while creating user activity. ${error}`)));
  });
};

// Create a new user event
const createNewEvent = (userId, name, description, reminderDateTime, color, repeatInterval, startDateTime, endDateTime) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
      INSERT INTO userActivity (userid, type, name, description, reminder_datetime, color, repeat_interval, start_datetime, end_datetime)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id;
    `;
    pool
      .query(insertActivityQuery, [userId, "event", name, description, reminderDateTime, color, repeatInterval, startDateTime, endDateTime])
      .then((result) => resolve(result.rows[0].id))
      .catch((error) => reject(new Error(`Database error while creating user activity. ${error}`)));
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
          id:row.id,
          type: row.type,
          name: row.name,
          description: row.description,
          dueDateTime: row.due_datetime,
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
      .catch((error) => reject(new Error(`Database error while getting user activities. ${error}`)));
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
      .catch((error) => reject(new Error(`Database error while getting user activity. ${error}`)));
  });
};

// Update a user activity
const updateUserActivity = (id, name, description, dueDateTime, reminderDateTime, color, repeatInterval, complete, startDateTime, endDateTime, streak) => {
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
      .query(updateActivityQuery, [name, description, dueDateTime, reminderDateTime, color, repeatInterval, complete, startDateTime, endDateTime, streak, id])
      .then((result) => {
        if (!result.rowCount) reject(new Error(`No activity found with id ${id}.`));
        resolve(`Activity ${id} is updated successfully.`);
      })
      .catch((error) => reject(new Error(`Database error while updating user activity. ${error}`)));
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
        if (!result.rowCount) reject(new Error(`No activity found with id ${id}.`));
        resolve(`Activity ${id} deleted successfully.`);
      })
      .catch((error) => reject(new Error(`Database error while deleting user activity. ${error}`)));
  });
};

const dbHealthCheck = () => {
  return new Promise((resolve, reject) => {
    const healthCheckQuery = `SELECT CURRENT_TIMESTAMP as health_check_time;`;
    pool
      .query(healthCheckQuery)
      .then((result) => resolve(result.rows[0].health_check_time))
      .catch((error) => reject(new Error(`Database error while health check. ${error}`)));
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

    const result = await pool.query(updateCompletionQuery, [isCompleted, now, activityId, userId]);

    if (!result.rowCount) {
      throw new Error(`No activity found with id ${activityId}.`);
    }

    const habit = result.rows[0];

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

    const result = await pool.query(getCompletionDatesQuery, [activityId, userId]);

    if (!result.rowCount) {
      return 1;
    }

    const completionDates = result.rows.map((row) => new Date(row.completed_at));
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
  createTables,
  addNewUser,
  isUniqueUser,
  dbHealthCheck,
  getUserInfo,
  deleteUser,
  updateUser,
  getUserPassword,
  updateUserPassword,
  getUserId,
  getMembershipInfo,
  updateMembership,
  addNewMembership,
  cleanTable,
  createNewTask,
  createNewHabit,
  createNewReminder,
  createNewEvent,
  updateHabitCompletion,
  calculateStreak,
  getUserActivities,
  getUserActivityById,
  updateUserActivity,
  deleteUserActivity,
};
