const request = require("supertest");
const app = require("../../src/app");
const { pool, cleanUserTable } = require("../../src/db");
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
    await cleanUserTable();
    const result = await request(app)
      .post("/api/auth/register-user")
      .send(sampleUser);
    jwtToken = result.body.body;
    userId = jwtDecoder(jwtToken)._id;
  } catch (error) {
    console.log(error);
  }
});

describe("GET /api/user/:id", () => {
  test("Cannot get anything if invalid id is passed.", async () => {
    // Pass invalid id.
    const response = await request(app)
      .get("/api/user/invalid")
      .set("Authorization", `jwt ${jwtToken}`);
    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
  });

  test("Returns firstName, lastName, username, email, dateOfBirth, avatar if the id passed is valid.", async () => {
    // Pass insufficient information in the body of the request.
    const response = await request(app)
      .get(`/api/user/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`);
    const { firstName, lastName, username, email, avatar } = response.body.body;
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    // Make sure the detail of the user is the same as stored.
    expect(firstName).toBe(sampleUser.firstName);
    expect(lastName).toBe(sampleUser.lastName);
    expect(username).toBe(sampleUser.username);
    expect(email).toBe(sampleUser.email);
    expect(avatar).toBe(sampleUser.avatar);
  });
});

describe("PATCH /api/user/:id", () => {
  test("Cannot update the user if insufficient information is provided.", async () => {
    // Pass insufficient information.
    const response = await request(app)
      .patch(`/api/user/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`)
      .send({
        firstName: sampleUser.firstName,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.ok).toBe(false);
  });

  test("Cannot update the user if the user id is invalid.", async () => {
    // Pass invalid userid.
    const response = await request(app)
      .patch(`/api/user/${userId + "invalid"}`)
      .set("Authorization", `jwt ${jwtToken}`)
      .send({
        firstName: sampleUser.firstName,
        lastName: sampleUser.lastName,
        email: sampleUser.email,
        avatar: sampleUser.avatar,
      });
    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
  });

  test("Update the user if the jwt token is present.", async () => {
    const updatedAvatar = "nodejs";
    // Update the user information.
    const updateUser = await request(app)
      .patch(`/api/user/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`)
      .send({
        firstName: sampleUser.firstName,
        lastName: sampleUser.lastName,
        email: sampleUser.email,
        avatar: updatedAvatar,
      });
    expect(updateUser.statusCode).toBe(200);
    expect(updateUser.body.ok).toBe(true);

    // Get the user information to make sure it is updated.
    const chechUpdate = await request(app)
      .get(`/api/user/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`);
    expect(chechUpdate.statusCode).toBe(200);
    expect(chechUpdate.body.ok).toBe(true);
    // Make sure it returns the updated avatar.
    expect(chechUpdate.body.body.avatar).toBe(updatedAvatar);
  });
});

describe("PATCH /api/user/password/:id", () => {
  test("Cannot update the password if insufficient information is provided.", async () => {
    // Pass insufficient information.
    const response = await request(app)
      .patch(`/api/user/password/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.ok).toBe(false);
  });

  test("Cannot update the password if invalid id is passed.", async () => {
    // Pass invalid id.
    const response = await request(app)
      .patch(`/api/user/password/${userId + "invalid"}`)
      .set("Authorization", `jwt ${jwtToken}`)
      .send({
        oldPassword: sampleUser.password,
        newPassword: "temp",
      });
    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
  });

  test("Cannot update the password if the old password passed is invalid.", async () => {
    // Pass invalid old password.
    const response = await request(app)
      .patch(`/api/user/password/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`)
      .send({
        oldPassword: sampleUser.password + "invalid",
        newPassword: "temp",
      });
    expect(response.statusCode).toBe(403);
    expect(response.body.ok).toBe(false);
  });

  test("Update the password if the old password is valid.", async () => {
    // Update the password.
    const newPassword = "This is my new password";
    const updatePassword = await request(app)
      .patch(`/api/user/password/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`)
      .send({
        oldPassword: sampleUser.password,
        newPassword: newPassword,
      });
    expect(updatePassword.statusCode).toBe(200);
    expect(updatePassword.body.ok).toBe(true);

    // Check if the password is updated.
    const checkNewPassword = await request(app)
      .post(`/api/auth/validate-user`)
      .send({
        username: sampleUser.username,
        password: newPassword,
      });
    expect(checkNewPassword.statusCode).toBe(200);
    expect(checkNewPassword.body.ok).toBe(true);
  });
});

describe("DELETE /api/user/:id", () => {
  test("Cannot delete the user if the id is invalid.", async () => {
    // Pass invalid user id.
    const response = await request(app)
      .delete(`/api/user/${userId + "invalid"}`)
      .set("Authorization", `jwt ${jwtToken}`);
    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
  });

  test("Delete the user if the id is valid.", async () => {
    // Delete the user.
    const deleteUser = await request(app)
      .delete(`/api/user/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`);
    expect(deleteUser.statusCode).toBe(200);
    expect(deleteUser.body.ok).toBe(true);

    // Make sure that the user is deleted.
    const checkDeletedUser = await request(app)
      .get(`/api/user/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`);
    expect(checkDeletedUser.statusCode).toBe(500);
    expect(checkDeletedUser.body.ok).toBe(false);
  });
});
