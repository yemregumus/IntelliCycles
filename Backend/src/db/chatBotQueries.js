const pool = require("./db");

// Create a new user task
const createChatBotQuestion = (question, answer) => {
  return new Promise((resolve, reject) => {
    const insertChatBotQuestion = `
        INSERT INTO chatBotQuestion (question, answer)
        VALUES ($1, $2)
      `;

    pool
      .query(insertChatBotQuestion, [question, answer])
      .then(() => resolve())
      .catch((error) =>
        reject(
          new Error(`Database error while creating user activity. ${error}`)
        )
      );
  });
};

module.exports = { createChatBotQuestion };
