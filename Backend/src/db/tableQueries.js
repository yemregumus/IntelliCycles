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

module.exports = {
  createTables,
  cleanTable,
};
