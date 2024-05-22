const request = require("supertest");
const app = require("../../src/app");
const info = require("../../package.json");

describe("Health check", () => {
  test("GET health check", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.body).toBe(info.version);
  });
});
