const pool = require("./db");
const {
  createTables,
  addNewUser,
  isUniqueUser,
  validateUser,
  dbHealthCheck,
  getUserInfo,
  deleteUser,
} = require("./dbQueries");

module.exports = {
  pool,
  createTables,
  addNewUser,
  isUniqueUser,
  validateUser,
  dbHealthCheck,
  getUserInfo,
  deleteUser,
};
