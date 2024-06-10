const pool = require("./db");
const bcrypt = require("bcrypt");
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
      .catch((error) => reject(new Error(`Database error while adding ${firstName}`)));
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
      .query(addMembershipQuery, [id, "Free"])
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

// Create a new user activity
const createUserActivity = (userid, type, name, description, due_date, reminder_datetime, color, repeat_interval, complete, start_time, end_time, streak) => {
  return new Promise((resolve, reject) => {
    const insertActivityQuery = `
      INSERT INTO userActivity (userid, type, name, description, due_date, reminder_datetime, color, repeat_interval, complete, start_time, end_time, streak)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id;
    `;
    pool
      .query(insertActivityQuery, [userid, type, name, description, due_date, reminder_datetime, color, repeat_interval, complete, start_time, end_time, streak])
      .then((result) => resolve(result.rows[0].id))
      .catch((error) => reject(new Error(`Database error while creating user activity. ${error}`)));
  });
};

// Get user activities by type for a specific user
const getUserActivitiesByType = (userid, type) => {
  return new Promise((resolve, reject) => {
    const getActivitiesQuery = `
      SELECT * FROM userActivity
      WHERE userid = $1 AND type = $2;
    `;
    pool
      .query(getActivitiesQuery, [userid, type])
      .then((result) => resolve(result.rows))
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
        if (!result.rowCount) {
          reject(new Error(`No activity found with id ${activityId}.`));
        } else {
          resolve(result.rows[0]);
        }
      })
      .catch((error) => reject(new Error(`Database error while getting user activity. ${error}`)));
  });
};

// Update a user activity
const updateUserActivity = (id, type, name, description, due_date, reminder_datetime, color, repeat_interval, complete, start_time, end_time, streak) => {
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
      .query(updateActivityQuery, [type, name, description, due_date, reminder_datetime, color, repeat_interval, complete, start_time, end_time, streak, id])
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
  createUserActivity,
  getUserActivitiesByType,
  getUserActivityById,
  updateUserActivity,
  deleteUserActivity,
};
