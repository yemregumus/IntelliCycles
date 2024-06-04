const pool = require("./db");
const bcrypt = require("bcrypt");

const createTables = () => {
  return new Promise((resolve, reject) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          firstName VARCHAR(100) NOT NULL,
          lastName VARCHAR(100) NOT NULL,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
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
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    const emailResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
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

const validateUser = async (username, password) => {
  try {
    // Query to fetch user data from the database based on the provided username
    const query = "SELECT password FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);

    // If no user found with the provided username, return false
    if (result.rows.length === 0)
      return {
        isValid: false,
        message: `No user found with the username ${username}.`,
      };

    // Retrieve the hashed password from the database
    const hashedPassword = result.rows[0].password;

    // Comparing the hashed password and the received password.
    const passwordCompare = await bcrypt.compare(password, hashedPassword);

    if (passwordCompare)
      return {
        isValid: true,
      };

    return {
      isValid: false,
      message: `The password is incorrect for ${username}.`,
    };
  } catch (error) {
    throw new Error(`Error verifying user credentials: ${error}`);
  }
};

const addNewUser = (firstName, lastName, username, email, password) => {
  return new Promise((resolve, reject) => {
    const insertUserQuery = `
        INSERT INTO users (firstName, lastName, username, email, password, created_at)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
        RETURNING id, username;
        `;
    pool
      .query(insertUserQuery, [firstName, lastName, username, email, password])
      .then((result) => {
        const { id, username } = result.rows[0];
        resolve({ _id: id, _username: username });
      })
      .catch((error) => reject(`Database error while adding ${firstName}`));
  });
};

const getUserInfo = (id) => {
  return new Promise((resolve, reject) => {
    const getUserInfoQuery = `SELECT firstname, lastname, username FROM users WHERE id=${id};`;
    pool
      .query(getUserInfoQuery)
      .then((result) =>
        resolve({
          firstname: result.rows[0].firstname,
          lastname: result.rows[0].lastname,
          username: result.rows[0].username,
        })
      )
      .catch((error) =>
        reject(`Database error while getting user info. ${error}`)
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
  validateUser,
  dbHealthCheck,
  getUserInfo,
};
