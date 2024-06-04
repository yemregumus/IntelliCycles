const express = require("express");
const router = express.Router();
const resMessage = require("../responseFormat");
const { addNewUser, isUniqueUser, validateUser } = require("../../db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { generateJWTToken } = require("../../jwt");

// Function to hash the password
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Error hashing password: ${error}`);
  }
};

router.post("/register-user", async (req, res) => {
  // Get the user data.
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    dateOfBirth,
    avatar,
  } = req.body;
  console.log(`Request to register a new user ${firstName}.`);
  try {
    // Make sure the username and email are unique.
    const { isUnique, message } = await isUniqueUser(username, email);

    if (!isUnique) return res.status(403).json(resMessage(false, message));

    // Hash the password.
    const hashedPassword = await hashPassword(password);

    // Add the user.
    const { _id, _username } = await addNewUser(
      firstName,
      lastName,
      username,
      email,
      hashedPassword,
      dateOfBirth,
      avatar
    );

    const token = generateJWTToken(_id, _username);

    res
      .status(200)
      .json(resMessage(true, `${_username} is registered.`, token));
  } catch (error) {
    res.status(500).json(resMessage(false, error));
  }
});

router.post("/validate-user", async (req, res) => {
  // Get the user data.
  const { username, password } = req.body;
  console.log(`Request to validate the user ${username}.`);
  try {
    // Validate the credentials.
    const { isValid, message } = await validateUser(username, password);

    // Return the appropriate response.
    if (!isValid) return res.status(401).json(resMessage(false, message));

    const token = generateJWTToken(username, password);

    res.status(200).json(resMessage(true, `${username} is validated.`, token));
  } catch (error) {
    res.status(500).json(resMessage(false, error));
  }
});

module.exports = router;
