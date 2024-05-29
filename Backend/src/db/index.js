const pool = require("./db");
const {
  createTables,
  addNewUser,
  isUniqueUser,
  validateUser,
} = require("./dbQueries");

module.exports = { pool, createTables, addNewUser, isUniqueUser, validateUser };
