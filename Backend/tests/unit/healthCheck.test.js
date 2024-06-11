const request = require("supertest");
const app = require("../../src/app");
const { pool } = require("../../src/db");
const info = require("../../package.json");

// End the pool once the test is completed.
afterAll(() => {
  pool.end();
});

describe("Health check", () => {
  test("GET health check", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.body["Version"]).toBe(info.version);
    expect(response.body.body["DB"]).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    );
  });
});
