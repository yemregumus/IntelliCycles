const express = require("express");
const router = express.Router();
const resMessage = require("../responseFormat");
const { addNewUser, isUniqueUser, getUserPassword } = require("../../db");
const { generateJWTToken } = require("../../jwt");
const { hashPassword, checkPassword } = require("./password");

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
    // Make sure the username and password are included.
    if (!username || !password)
      return res
        .status(400)
        .json(
          resMessage(
            false,
            `Insufficient information received. Please check the requirements of this api.`
          )
        );

    // Get the stored password.
    const storedPassword = await getUserPassword(username);

    // Try to match the stored password with the received password.
    if (!checkPassword(password, storedPassword))
      return res
        .status(401)
        .json(resMessage(false, `The password for ${username} is incorrect.`));

    // Generate the token for the user.
    const token = generateJWTToken(username, password);

    res.status(200).json(resMessage(true, `${username} is validated.`, token));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

module.exports = router;
