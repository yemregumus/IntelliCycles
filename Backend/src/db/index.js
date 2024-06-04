const pool = require("./db");
const {
  createTables,
  addNewUser,
  isUniqueUser,
  validateUser,
  dbHealthCheck,
} = require("./dbQueries");

module.exports = {
  pool,
  createTables,
  addNewUser,
  isUniqueUser,
  validateUser,
  dbHealthCheck,
};
