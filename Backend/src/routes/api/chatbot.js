const express = require("express");
const router = express.Router();
const resMessage = require("../responseFormat");
const {
  createChatBotQuestion,
  getChatBotQuestions,
  getChatBotAnswer,
} = require("../../db");

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
    const questionId = await createChatBotQuestion(question, answer);

    res
      .status(200)
      .json(resMessage(true, `New question is added.`, questionId));
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

router.get("/question", async (req, res) => {
  console.log("Get all the questions for chatbot.");

  try {
    // Get all the questions.
    const questions = await getChatBotQuestions();

    res
      .status(200)
      .json(
        resMessage(
          true,
          `${questions.length} questions are returned.`,
          questions
        )
      );
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

router.get("/answer/:questionId", async (req, res) => {
  // Get question id for the required question.
  const { questionId } = req.params;

  // Make sure that the id is present.
  if (!questionId)
    return res
      .status(400)
      .json(
        resMessage(
          false,
          `Insufficient information received. Please check the requirements of this api.`
        )
      );

  console.log(`Get answer of ${questionId}.`);

  try {
    // Get all the questions.
    const answer = await getChatBotAnswer(questionId);

    res
      .status(200)
      .json(
        resMessage(
          true,
          `Answer of question ${questionId} is returned.`,
          answer
        )
      );
  } catch (error) {
    res.status(500).json(resMessage(false, error.message));
  }
});

module.exports = router;
