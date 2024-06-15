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

describe("GET /api/membership/:id", () => {
  test("Cannot get anything if invalid id is passed.", async () => {
    // Pass invalid id.
    const response = await request(app)
      .get("/api/membership/invalid")
      .set("Authorization", `jwt ${jwtToken}`);
    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
  });

  test("Get membership if valid id is passed.", async () => {
    const response = await request(app)
      .get(`/api/membership/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`);
    const { membershipType } = response.body.body;
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(membershipType).toBe("free");
  });
});

describe("POST /api/membership/:id", () => {
  test("Cannot post the membership if invalid id is passed.", async () => {
    // Pass invalid id.
    const response = await request(app)
      .post("/api/membership/invalid")
      .set("Authorization", `jwt ${jwtToken}`)
      .send({ membershipType: "Premium" });
    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
  });

  test("Cannot post the membership if insufficient data is passed.", async () => {
    // Pass insufficient information.
    const response = await request(app)
      .post(`/api/membership/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`);
    expect(response.statusCode).toBe(400);
    expect(response.body.ok).toBe(false);
  });

  test("Update membership if valid id is passed.", async () => {
    const newMembershipType = "Premium";
    // Update Membership.
    const updateMembership = await request(app)
      .post(`/api/membership/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`)
      .send({ membershipType: newMembershipType });
    expect(updateMembership.statusCode).toBe(200);
    expect(updateMembership.body.ok).toBe(true);

    // Check updated Memberhip.
    const updatedMembership = await request(app)
      .get(`/api/membership/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`);
    const { membershipType } = updatedMembership.body.body;
    expect(updatedMembership.statusCode).toBe(200);
    expect(updatedMembership.body.ok).toBe(true);
    expect(membershipType).toBe(newMembershipType);
  });
});

describe("DELETE /api/membership/:id", () => {
  test("Cannot delete the membership if invalid id is passed.", async () => {
    // Pass invalid id.
    const response = await request(app)
      .delete("/api/membership/invalid")
      .set("Authorization", `jwt ${jwtToken}`);
    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
  });

  test("Delete membership if valid id is passed.", async () => {
    // Delete Membership.
    const deleteMembership = await request(app)
      .delete(`/api/membership/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`);
    expect(deleteMembership.statusCode).toBe(200);
    expect(deleteMembership.body.ok).toBe(true);

    // Check deleted Memberhip.
    const deletedMembership = await request(app)
      .get(`/api/membership/${userId}`)
      .set("Authorization", `jwt ${jwtToken}`);
    const { membershipType } = deletedMembership.body.body;
    expect(deletedMembership.statusCode).toBe(200);
    expect(deletedMembership.body.ok).toBe(true);
    expect(membershipType).toBe("free");
  });
});
