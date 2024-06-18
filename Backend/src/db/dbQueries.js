const pool = require("./db");
const fs = require("fs");

const createTables = () => {
  return new Promise((resolve, reject) => {
    const createTableQuery = fs.readFileSync("src/db/tables.sql", "utf8");
    pool
      .query(createTableQuery)
      .then(resolve("All tables created."))
      .catch(
        reject(new Error("Database error while creating all the tables."))
      );
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
      .catch(() =>
        reject(new Error("Database error while clearning all the tables."))
      );
  });
};

const isUniqueUser = async (username, email) => {
  return new Promise((resolve, reject) => {
    pool
      .query(
        'SELECT username, email FROM "user" WHERE username = $1 OR email = $2',
        [username, email]
      )
      .then((result) => {
        if (!result.rowCount) resolve(true);
        if (result.rows[0].username === username)
          reject(new Error(`The username is already taken.`));
        reject(new Error(`The email is already taken.`));
      })
      .catch((error) =>
        reject(new Error(`Database error while checking uniqueness: ${error}`))
      );
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
        if (!result.rowCount)
          reject(new Error(`No user found with the username ${username}.`));
        resolve(result.rows[0].password);
      })
      .catch((error) =>
        reject(new Error(`Error getting the user password: ${error}`))
      );
  });
};

const getUserId = (username) => {
  return new Promise((resolve, reject) => {
    // Query to fetch user id from the database.
    const getUserIdQuery = `SELECT id FROM "user" WHERE username = $1`;
    pool
      .query(getUserIdQuery, [username])
      .then((result) => {
        if (!result.rowCount)
          reject(new Error(`No user found with the username ${username}.`));
        resolve(result.rows[0].id);
      })
      .catch((error) =>
        reject(new Error(`Error getting the user password: ${error}`))
      );
  });
};

const addNewUser = (
  firstName,
  lastName,
  username,
  email,
  password,
  dateOfBirth,
  avatar
) => {
  return new Promise((resolve, reject) => {
    const insertUserQuery = `
        INSERT INTO "user" (firstname, lastname, username, email, password, dateofbirth, avatar)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, username;
        `;
    pool
      .query(insertUserQuery, [
        firstName,
        lastName,
        username,
        email,
        password,
        dateOfBirth,
        avatar,
      ])
      .then((result) => {
        const { id, username } = result.rows[0];
        resolve({ _id: id, _username: username });
      })
      .catch((error) =>
        reject(new Error(`Database error while adding ${firstName}. ${error}`))
      );
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
        reject(
          new Error(`Database error while updathing ${firstName}. ${error}`)
        );
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
        reject(
          new Error(`Database error while updathing ${id}'s password. ${error}`)
        );
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
        if (!result.rowCount)
          reject(new Error(`Database error. Invalid user id, ${id}.`));
        const { firstname, lastname, username, email, dateofbirth, avatar } =
          result.rows[0];
        resolve({
          firstName: firstname,
          lastName: lastname,
          username: username,
          email: email,
          dateOfBirth: dateofbirth,
          avatar: avatar,
        });
      })
      .catch((error) =>
        reject(new Error(`Database error while getting user info. ${error}`))
      );
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
        if (!result.rowCount)
          reject(new Error(`Database error. No user found with ${id}.`));
        resolve(`User ${id} deleted successfully.`);
      })
      .catch((error) =>
        reject(new Error(`Database error while deleting the user. ${error}`))
      );
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
      .catch((error) =>
        reject(new Error(`Database error while getting user info. ${error}`))
      );
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
        if (!result.rowCount)
          reject(new Error(`User ${id} already has a membership.`));
        resolve(`${id}'s membership is added.`);
      })
      .catch((error) => {
        reject(
          new Error(`Database error while adding ${id}'s membership. ${error}`)
        );
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
        reject(
          new Error(
            `Database error while updathing ${id}'s membership. ${error}`
          )
        );
      });
  });
};

// Create a new user task
const createNewTask = (
  userId,
  name,
  description,
  dueDatetime,
  reminderDatetime,
  color,
  repeatInterval,
  complete
) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
      INSERT INTO userActivity (userid, type, name, description, due_date, reminder_datetime, color, repeat_interval, complete)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id;
    `;

    pool
      .query(insertActivityQuery, [
        userId,
        "task",
        name,
        description,
        dueDatetime,
        reminderDatetime,
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
  reminderDatetime,
  color,
  repeatInterval
) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
      INSERT INTO userActivity (userid, type, name, reminder_datetime, color, repeat_interval)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    pool
      .query(insertActivityQuery, [
        userId,
        "reminder",
        name,
        reminderDatetime,
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
  reminderDatetime,
  color,
  repeatInterval,
  complete,
  streak
) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
      INSERT INTO userActivity (userid, type, name, description, due_date, reminder_datetime, color, repeat_interval, complete, streak)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id;
    `;
    pool
      .query(insertActivityQuery, [
        userId,
        "habit",
        name,
        description,
        dueDatetime,
        reminderDatetime,
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
  reminderDatetime,
  color,
  repeatInterval,
  startDateTime,
  endDateTime
) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
      INSERT INTO userActivity (userid, type, name, description, reminder_datetime, color, repeat_interval, start_time, end_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id;
    `;
    pool
      .query(insertActivityQuery, [
        userId,
        "event",
        name,
        description,
        reminderDatetime,
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
          name: row.name,
          description: row.description,
          dueDateTime: row.due_date,
          reminderDateTime: row.reminder_datetime,
          color: row.color,
          repeatInterval: row.repeat_interval,
          complete: row.complete,
          streak: row.streak,
          startDateTime: row.start_time,
          endDateTime: row.end_time,
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
          name: result.rows[0].name,
          description: result.rows[0].description,
          dueDateTime: result.rows[0].due_date,
          reminderDateTime: result.rows[0].reminder_datetime,
          color: result.rows[0].color,
          repeatInterval: result.rows[0].repeat_interval,
          complete: result.rows[0].complete,
          streak: result.rows[0].streak,
          startDateTime: result.rows[0].start_time,
          endDateTime: result.rows[0].end_time,
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
  type,
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
) => {
  return new Promise((resolve, reject) => {
    const updateActivityQuery = `
      UPDATE userActivity
      SET type = $1,
          name = $2,
          description = $3,
          due_date = $4,
          reminder_datetime = $5,
          color = $6,
          repeat_interval = $7,
          complete = $8,
          start_time = $9,
          end_time = $10,
          streak = $11
      WHERE id = $12;
    `;
    pool
      .query(updateActivityQuery, [
        type,
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

const dbHealthCheck = () => {
  return new Promise((resolve, reject) => {
    const healthCheckQuery = `SELECT CURRENT_TIMESTAMP as health_check_time;`;
    pool
      .query(healthCheckQuery)
      .then((result) => resolve(result.rows[0].health_check_time))
      .catch((error) =>
        reject(new Error(`Database error while health check. ${error}`))
      );
  });
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
  getUserActivities,
  getUserActivityById,
  deleteUserActivity,
};
