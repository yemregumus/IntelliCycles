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

const cleanUserTable = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const dropUseractivityQuery = 'DELETE FROM "useractivity";';
    await client.query(dropUseractivityQuery);

    const dropMembershipQuery = 'DELETE FROM "membership";';
    await client.query(dropMembershipQuery);

    const dropUserQuery = 'DELETE FROM "user";';
    await client.query(dropUserQuery);

    await client.query("COMMIT"); // Commit transaction
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback transaction on error
    throw new Error(
      "Database error while clearing all the tables: " + error.message
    );
  } finally {
    client.release();
  }
};

const cleanChatBotQuestionTable = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const dropChatBotQuestionQuery = 'DELETE FROM "chatbotquestion";';
    await client.query(dropChatBotQuestionQuery);

    await client.query("COMMIT"); // Commit transaction
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback transaction on error
    throw new Error(
      "Database error while clearing chatbot tables: " + error.message
    );
  } finally {
    client.release();
  }
};

module.exports = {
  createTables,
  cleanUserTable,
  cleanChatBotQuestionTable,
};
