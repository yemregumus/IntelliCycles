const pool = require("./db");
const { createTables, addNewUser, isUniqueUser, dbHealthCheck, getUserInfo, deleteUser, updateUser, getUserPassword, updateUserPassword, getUserId, getMembershipInfo, updateMembership, addNewMembership, createUserActivity, getUserActivitiesByType, getUserActivityById, updateUserActivity, deleteUserActivity } = require("./dbQueries");

module.exports = {
  pool,
  createTables,
  addNewUser,
  isUniqueUser,
  dbHealthCheck,
  getUserInfo,
  deleteUser,
  updateUser,
  getUserPassword,
  updateUserPassword,
  getUserId,
  getMembershipInfo,
  updateMembership,
  addNewMembership,
  createUserActivity,
  getUserActivitiesByType,
  getUserActivityById,
  updateUserActivity,
  deleteUserActivity,
};
