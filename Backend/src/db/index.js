const pool = require("./db");
const {
  createTables,
  addNewUser,
  isUniqueUser,
  validateUser,
  dbHealthCheck,
  getUserInfo,
} = require("./dbQueries");

module.exports = {
  pool,
  createTables,
  addNewUser,
  isUniqueUser,
  validateUser,
  dbHealthCheck,
  getUserInfo,
};
