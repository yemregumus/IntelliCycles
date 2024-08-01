const pool = require("./db");

// Create a new user task
const createChatBotQuestion = (question, answer) => {
  return new Promise((resolve, reject) => {
    const insertChatBotQuestion = `
        INSERT INTO chatBotQuestion (question, answer)
        VALUES ($1, $2)
        RETURNING id;
      `;

    pool
      .query(insertChatBotQuestion, [question, answer])
      .then((result) => {
        const { id } = result.rows[0];
        resolve(id);
      })
      .catch((error) =>
        reject(
          new Error(`Database error while creating user activity. ${error}`)
        )
      );
  });
};

const getChatBotQuestions = () => {
  return new Promise((resolve, reject) => {
    // Query to fetch user data from the database based on the provided username/id.
    const query = `SELECT id, question FROM chatBotQuestion;`;
    pool
      .query(query)
      .then((result) => {
        if (!result.rowCount) reject(new Error(`No questions found.`));
        resolve(result.rows);
      })
      .catch((error) =>
        reject(new Error(`Error getting the user password: ${error}`))
      );
  });
};

const getChatBotAnswer = (id) => {
  return new Promise((resolve, reject) => {
    // Query to fetch user data from the database based on the provided username/id.
    const query = `SELECT answer FROM chatBotQuestion WHERE id = $1;`;
    pool
      .query(query, [id])
      .then((result) => {
        if (!result.rowCount)
          reject(new Error(`No question found with id, ${id}.`));

        resolve(result.rows[0].answer);
      })
      .catch((error) =>
        reject(new Error(`Error getting the user password: ${error}`))
      );
  });
};

module.exports = {
  createChatBotQuestion,
  getChatBotQuestions,
  getChatBotAnswer,
};
