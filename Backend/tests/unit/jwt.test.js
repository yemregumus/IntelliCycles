const request = require("supertest");
const app = require("../../src/app");
const { pool, cleanTable } = require("../../src/db");
const { jwtDecoder } = require("../../src/jwt");

// To store the jwt token for the user created.
let jwtToken, userId;
// Sample user's information.
const sampleUser = {
  firstName: "Dev",
  lastName: "Shah",
  username: "busycaesar",
  email: "djshah11@myseneca.ca",
  password: "1234",
  dateOfBirth: "2001-09-12",
  avatar: "temp",
};

// End the pool once the test is completed.
afterAll(() => {
  pool.end();
});

// Clean all the users and create a sample user before starting any test.
beforeAll(async () => {
  try {
    await cleanTable();
    const result = await request(app)
      .post("/api/auth/register-user")
      .send(sampleUser);
    jwtToken = result.body.body;
    userId = jwtDecoder(jwtToken)._id;
  } catch (error) {
    console.log(error);
  }
});

describe("Invalid or Absent JWT", () => {
  test("Cannot get user information if the jwt token is not present or is invalid.", async () => {
    // Pass insufficient information in the body of the request.
    const response = await request(app)
      .get(`/api/user/${userId}`)
      .set("Authorization", `jwt ${jwtToken + "Invalid"}`);
    expect(response.statusCode).toBe(401);
  });

  test("Cannot update the user if the jwt token is not present or is invalid.", async () => {
    // Pass invalid jwt token.
    const invalidJWT = await request(app)
      .patch(`/api/user/${userId}`)
      .set("Authorization", `jwt ${jwtToken + "invalid"}`)
      .send({
        firstName: sampleUser.firstName,
        lastName: sampleUser.lastName,
        email: sampleUser.email,
        avatar: sampleUser.avatar + "update",
      });
    expect(invalidJWT.statusCode).toBe(401);
    // Dont pass jwt token.
    const absentJWT = await request(app)
      .patch(`/api/user/${userId}`)
      .send({
        firstName: sampleUser.firstName,
        lastName: sampleUser.lastName,
        email: sampleUser.email,
        avatar: sampleUser.avatar + "update",
      });
    expect(absentJWT.statusCode).toBe(401);
  });
});
