const express = require("express");
const router = express.Router();
const resMessage = require("../responseFormat");
const { createChatBotQuestion } = require("../../db");

router.post("/question", async (req, res) => {
  // Get new question and answer.
  const { question, answer } = req.body;

  console.log(`Add new question and answer`);

  if (!question || !answer)
    return res
      .status(400)
      .json(
        resMessage(
          false,
          `Insufficient information received. Please check the requirements of this api.`
        )
      );

  try {
    // Store the new question and answer.
    await createChatBotQuestion(question, answer);

    res.status(200).json(resMessage(true, `New question is added.`));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

router.post("/validate-user", async (req, res) => {
  // Get the user data.
  const { username, password } = req.body;
  console.log(`Request to validate the user ${username}.`);
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

  try {
    // Get the stored password.
    const storedPassword = await getUserPassword(username);

    // Try to match the stored password with the received password.
    const isSamePassword = await checkPassword(password, storedPassword);
    if (!isSamePassword)
      return res
        .status(403)
        .json(resMessage(false, `The password for ${username} is incorrect.`));

    // Get the user id.
    const userId = await getUserId(username);

    // Generate the token for the user.
    const token = generateJWTToken(userId, username);

    res.status(200).json(resMessage(true, `${username} is validated.`, token));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

module.exports = router;
