const request = require("supertest");
const app = require("../../src/app");
const { pool, cleanUserTable } = require("../../src/db");
const { jwtDecoder } = require("../../src/jwt");

// End the pool once the test is completed.
afterAll(() => {
  pool.end();
});

const sampleUser = {
    firstName: "Dev",
    lastName: "Shah",
    username: "busycaesar",
    email: "djshah11@myseneca.ca",
    password: "1234",
    dateOfBirth: "2001-09-12",
    avatar: "temp",
  },
  sampleUserActivity = {
    name: "Assignment 3",
    description: "Complete assignment 3 of SDR.",
    dueDateTime: "2024-08-15",
    reminderDateTime: "2024-08-10",
    color: "red",
  },
  sampleUserActivityType = "task";

let userId, activityId;

beforeAll(async () => {
  try {
    // Clean the user and user activity table.
    await cleanUserTable();
    console.log("Table cleaned");

    // Create a new sample user.
    const newUser = await request(app)
      .post("/api/auth/register-user")
      .send(sampleUser);
    userId = jwtDecoder(newUser.body.body)._id;

    // Create a new sample task.
    const newTask = await request(app)
      .post(`/api/activity/${sampleUserActivityType}/${userId}`)
      .send(sampleUserActivity);
    activityId = newTask.body.body;
  } catch (error) {
    console.log(error);
  }
});

describe("POST /api/activity/:type/:userId", () => {
  test("With invalid activity type", async () => {
    const response = await request(app)
      .post(`/api/activity/invalidType/${userId}`)
      .send(sampleUserActivity);

    expect(response.statusCode).toBe(400);
    expect(response.body.ok).toBe(false);
  });

  test("Invalid user id", async () => {
    const response = await request(app)
      .post(`/api/activity/task/${userId}Invalid`)
      .send(sampleUserActivity);

    expect(response.statusCode).toBe(400);
    expect(response.body.ok).toBe(false);
  });

  test("Create a new task without 'name' and 'due date'", async () => {
    const response = await request(app)
      .post(`/api/activity/task/${userId}`)
      .send({
        noname: "Task name",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.ok).toBe(false);
  });

  test("Create a new reminders with all the required data", async () => {
    const response = await request(app)
      .post(`/api/activity/reminder/${userId}`)
      .send({
        name: "Drink water",
        reminderDateTime: "2024-08-02",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
  });
});

describe("GET /api/activity/user/:userId", () => {
  test("Invalid userId", async () => {
    const response = await request(app).get(
      `/api/activity/user/${userId}Invalid`
    );

    expect(response.statusCode).toBe(400);
    expect(response.body.ok).toBe(false);
  });

  test("Ideal", async () => {
    const response = await request(app).get(`/api/activity/user/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);

    // Get the details of the first user activity.
    const { id, type, name, description, color } = response.body.body[0];

    // Make sure the first user activity is the activity created in beforeAll function. It should be equal to sample user activity.
    expect(id).toBe(activityId);
    expect(type).toBe(sampleUserActivityType);
    expect(name).toBe(sampleUserActivity.name);
    expect(description).toBe(sampleUserActivity.description);
    expect(color).toBe(sampleUserActivity.color);
  });
});

describe("GET /api/activity/:id", () => {
  test("With invalid activity id.", async () => {
    const response = await request(app).get(
      `/api/activity/${activityId}Invalid`
    );

    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
  });

  test("Ideal", async () => {
    const response = await request(app).get(`/api/activity/${activityId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);

    const { type, name, description, color } = response.body.body;
    // Make sure the first user activity is the activity created in beforeAll function. It should be equal to sample user activity.
    expect(type).toBe(sampleUserActivityType);
    expect(name).toBe(sampleUserActivity.name);
    expect(description).toBe(sampleUserActivity.description);
    expect(color).toBe(sampleUserActivity.color);
  });
});

describe("/api/activity/:id", () => {
  test("With invalid activity id.", async () => {
    const response = await request(app).patch(
      `/api/activity/${activityId}Invalid`
    );

    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
  });

  test("With invalid activity id.", async () => {
    // Get the data from sample activity.
    let newActivity = sampleUserActivity;

    // Update the data.
    newActivity.name = "Assignment 3, SDR";
    newActivity.color = "black";

    // Call the API and pass the updated data.
    const updateActivityResponse = await request(app)
      .patch(`/api/activity/${activityId}`)
      .send(newActivity);

    // Make sure it returns the success response.
    expect(updateActivityResponse.statusCode).toBe(200);
    expect(updateActivityResponse.body.ok).toBe(true);

    // Fetch the activity using the id.
    const response = await request(app).get(`/api/activity/${activityId}`);

    // Make sure it returns the success response.
    expect(updateActivityResponse.statusCode).toBe(200);
    expect(updateActivityResponse.body.ok).toBe(true);

    // Get the required data from the response body.
    const { name, color } = response.body.body;

    // Make sure the data is updated.
    expect(name).toBe(newActivity.name);
    expect(color).toBe(newActivity.color);
  });
});

describe("DELETE /api/activity/:id", () => {
  test("With invalid activity id.", async () => {
    const response = await request(app).delete(
      `/api/activity/${activityId}Invalid`
    );

    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
  });

  test("Ideal", async () => {
    const deleteActivityResponse = await request(app).delete(
      `/api/activity/${activityId}`
    );

    // Make sure it deletes the activity.
    expect(deleteActivityResponse.statusCode).toBe(200);
    expect(deleteActivityResponse.body.ok).toBe(true);

    const response = await request(app).get(`/api/activity/${activityId}`);

    // It should return error since the activity is already deleted.
    expect(response.statusCode).toBe(500);
    expect(response.body.ok).toBe(false);
  });
});
