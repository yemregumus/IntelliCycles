const pool = require("./db");
const bcrypt = require("bcrypt");
const fs = require("fs");

const createTables = () => {
  return new Promise((resolve, reject) => {
    const createTableQuery = fs.readFileSync("src/db/tables.sql", "utf8");
    pool
      .query(createTableQuery)
      .then(resolve("All tables created."))
      .catch(reject("Database error while creating all the tables."));
  });
};

const isUniqueUser = async (username, email) => {
  try {
    // Query for username as well as email.
    const usernameResult = await pool.query(
      'SELECT * FROM "user" WHERE username = $1',
      [username]
    );
    const emailResult = await pool.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );

    // Get the bool value to make sure both the queries return 0 result.
    const isUsernameUnique = usernameResult.rows.length === 0;
    const isEmailUnique = emailResult.rows.length === 0;

    // Return the result as well as a proper error message according to the bool value.
    if (!isUsernameUnique && !isEmailUnique)
      return {
        isUnique: false,
        message: "Email and username are already taken.",
      };
    else if (!isUsernameUnique)
      return {
        isUnique: false,
        message: "Username is already taken.",
      };
    else if (!isEmailUnique)
      return {
        isUnique: false,
        message: "Email is already taken.",
      };

    return { isUnique: true };
  } catch (error) {
    throw new Error(`Database error while checking uniqueness: ${error}`);
  }
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
        if (result.rows.length === 0)
          reject(new Error(`No user found with the username ${username}.`));
        resolve(result.rows[0].password);
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
      .catch((error) => reject(`Database error while adding ${firstName}`));
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
        if (result.rowCount <= 0)
          reject(new Error(`No user found with id ${id}.`));
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
        if (result.rowCount <= 0)
          reject(new Error(`No user found with id ${id}.`));
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
    SELECT firstname, lastname, username, dateofbirth, avatar 
    FROM "user" WHERE id=${id};
    `;
    pool
      .query(getUserInfoQuery)
      .then((result) => {
        try {
          const { firstname, lastname, username, dateofbirth, avatar } =
            result.rows[0];
          resolve({
            firstName: firstname,
            lastName: lastname,
            username: username,
            dateOfBirth: dateofbirth,
            avatar: avatar,
          });
        } catch (error) {
          reject(`Database error. Invalid user id, ${id}.`);
        }
      })
      .catch((error) =>
        reject(`Database error while getting user info. ${error}`)
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
          reject(`Database error. No user found with ${id}.`);
        resolve(`User ${id} deleted successfully.`);
      })
      .catch((error) =>
        reject(`Database error while deleting the user. ${error}`)
      );
  });
};

const dbHealthCheck = () => {
  return new Promise((resolve, reject) => {
    const healthCheckQuery = `SELECT CURRENT_TIMESTAMP as health_check_time;`;
    pool
      .query(healthCheckQuery)
      .then((result) => resolve(result.rows[0].health_check_time))
      .catch((error) => reject(`Database error while health check. ${error}`));
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
};
