const pool = require("./db");
const { dbHealthCheck } = require("./dbQueries");
const {
  createTables,
  cleanUserTable,
  cleanChatBotQuestionTable,
} = require("./tableQueries");
const {
  addNewUser,
  isUniqueUser,
  getUserInfo,
  deleteUser,
  updateUser,
  getUserPassword,
  updateUserPassword,
  getUserId,
} = require("./userQueries");
const {
  getMembershipInfo,
  updateMembership,
  addNewMembership,
} = require("./membershipQueries");
const {
  createNewTask,
  createNewHabit,
  createNewReminder,
  createNewEvent,
  getUserActivities,
  getUserActivityById,
  updateUserActivity,
  deleteUserActivity,
} = require("./userActivityQueries");
const {
  createChatBotQuestion,
  getChatBotQuestions,
  getChatBotAnswer,
} = require("./chatBotQueries");

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
  cleanUserTable,
  cleanChatBotQuestionTable,
  createNewTask,
  createNewHabit,
  createNewReminder,
  createNewEvent,
  getUserActivities,
  getUserActivityById,
  updateUserActivity,
  deleteUserActivity,
  createChatBotQuestion,
  getChatBotQuestions,
  getChatBotAnswer,
};
