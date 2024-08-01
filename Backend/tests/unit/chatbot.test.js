const request = require("supertest");
const app = require("../../src/app");
const { pool, cleanChatBotQuestionTable } = require("../../src/db");

// End the pool once the test is completed.
afterAll(() => {
  pool.end();
});

const sampleQuestion = {
  question: "How does this chatbot works?",
  answer: "You select the question and it returns the answer.",
};

let questionId;

beforeAll(async () => {
  try {
    // Clean the user and user activity table.
    await cleanChatBotQuestionTable();

    // Create a new sample user.
    const newQuestion = await request(app)
      .post("/api/chatbot/question")
      .send(sampleQuestion);
    questionId = newQuestion.body.body;
  } catch (error) {
    console.log(error);
  }
});

describe("POST /api/chatbot/question", () => {
  test("Without question and answer", async () => {
    const response = await request(app).post(`/api/chatbot/question`).send();

    expect(response.statusCode).toBe(400);
    expect(response.body.ok).toBe(false);
  });

  test("Create a new question", async () => {
    const response = await request(app)
      .post(`/api/chatbot/question`)
      .send(sampleQuestion);

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
  });
});

describe("GET /api/chatbot/question", () => {
  test("All questions are returned.", async () => {
    const response = await request(app).get(`/api/chatbot/question`);

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);

    const { id, question } = response.body.body[0];

    expect(id).toBe(questionId);
    expect(question).toBe(sampleQuestion.question);
  });
});

describe("GET /api/chatbot/answer/:questionId", () => {
  test("With invalid question id.", async () => {
    const response = await request(app).get(
      `/api/chatbot/answer/${questionId}Invalid`
    );

    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
  });

  test("Get the answer of the valid question.", async () => {
    const response = await request(app).get(
      `/api/chatbot/answer/${questionId}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.body).toBe(sampleQuestion.answer);
  });
});
