const pool = require("./db");

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
    const query = `SELECT password FROM "user" WHERE ${where} = $1;`;
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
    const getUserIdQuery = `SELECT id FROM "user" WHERE username = $1;`;
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

module.exports = {
  addNewUser,
  isUniqueUser,
  getUserInfo,
  deleteUser,
  updateUser,
  getUserPassword,
  updateUserPassword,
  getUserId,
};
