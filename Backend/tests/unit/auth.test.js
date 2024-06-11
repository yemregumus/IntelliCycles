const request = require("supertest");
const app = require("../../src/app");
const { pool, cleanTable } = require("../../src/db");
const { jwtDecoder } = require("../../src/jwt");

// End the pool once the test is completed.
afterAll(() => {
  pool.end();
});

describe("POST /api/auth/register-user", () => {
  // Clean all the users before starting any test.
  beforeAll(async () => {
    try {
      await cleanTable();
    } catch (error) {
      console.log(error);
    }
  });

  test("Cannot register with insufficient information", async () => {
    // Pass insufficient information in the body of the request.
    const response = await request(app).post("/api/auth/register-user").send({
      firstName: "Dev",
      lastName: "Shah",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.ok).toBe(false);
  });

  test("Register the user with all the information", async () => {
    const username = "busycaesar";
    const response = await request(app).post("/api/auth/register-user").send({
      firstName: "Dev",
      lastName: "Shah",
      username: username,
      email: "djshah11@myseneca.ca",
      password: "1234",
      dateOfBirth: "2001-09-12",
      avatar: "temp",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(jwtDecoder(response.body.body)._username).toBe(username);
  });

  test("Cannot register with existing username and email", async () => {
    const username = "busycaesar",
      email = "djshah11@myseneca.ca";
    // Store a new user.
    await request(app).post("/api/auth/register-user").send({
      firstName: "Dev",
      lastName: "Shah",
      username: username,
      email: email,
      password: "1234",
      dateOfBirth: "2001-09-12",
      avatar: "temp",
    });
    // Try storing a new user with already used username.
    const sameUsername = await request(app)
      .post("/api/auth/register-user")
      .send({
        firstName: "Dev",
        lastName: "Shah",
        username: username,
        email: email + "temp",
        password: "1234",
        dateOfBirth: "2001-09-12",
        avatar: "temp",
      });
    expect(sameUsername.statusCode).toBe(500);
    expect(sameUsername.body.ok).toBe(false);
    // Try storing a new user with already used username.
    const sameEmail = await request(app)
      .post("/api/auth/register-user")
      .send({
        firstName: "Dev",
        lastName: "Shah",
        username: username + "temp",
        email: email,
        password: "1234",
        dateOfBirth: "2001-09-12",
        avatar: "temp",
      });
    expect(sameEmail.statusCode).toBe(500);
    expect(sameEmail.body.ok).toBe(false);
  });
});

describe("POST /api/auth/validate-user", () => {
  const username = "busycaesar",
    password = "1234";
  // Clean all the users and create a sample user before starting any test.
  beforeAll(async () => {
    try {
      await cleanTable();
      await request(app).post("/api/auth/register-user").send({
        firstName: "Dev",
        lastName: "Shah",
        username: username,
        email: "djshah11@myseneca.ca",
        password: password,
        dateOfBirth: "2001-09-12",
        avatar: "tempp",
      });
    } catch (error) {
      console.log(error);
    }
  });

  test("cannot validate with insufficient information", async () => {
    // Pass insufficient information in the body of the request.
    const response = await request(app).post("/api/auth/validate-user").send({
      username: username,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.ok).toBe(false);
  });

  test("cannot validate with invalid username and/password", async () => {
    const invalidUsername = await request(app)
      .post("/api/auth/validate-user")
      .send({
        username: username + "invalid",
        password: password,
      });
    expect(invalidUsername.statusCode).toBe(500);
    expect(invalidUsername.body.ok).toBe(false);

    const invalidPassword = await request(app)
      .post("/api/auth/validate-user")
      .send({
        username: username,
        password: password + "invalid",
      });
    expect(invalidPassword.statusCode).toBe(403);
    expect(invalidPassword.body.ok).toBe(false);

    const invalidCredentials = await request(app)
      .post("/api/auth/validate-user")
      .send({
        username: username + "invalid",
        password: password + "invalid",
      });
    expect(invalidCredentials.statusCode).toBe(500);
    expect(invalidCredentials.body.ok).toBe(false);
  });

  test("valid credentials should return jwt token", async () => {
    const response = await request(app).post("/api/auth/validate-user").send({
      username: username,
      password: password,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(jwtDecoder(response.body.body)._username).toBe(username);
  });
});
