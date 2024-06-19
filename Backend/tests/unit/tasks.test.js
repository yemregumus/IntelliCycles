// const request = require("supertest");
// const express = require("express");
// const tasksRouter = require("../../src/routes/api/tasks");
// const resMessage = require("../../src/routes/responseFormat");

// // Mock the database functions
// jest.mock("../../src/db", () => ({
//   createUserActivity: jest.fn(),
//   getUserActivitiesByType: jest.fn(),
//   getUserActivityById: jest.fn(),
//   updateUserActivity: jest.fn(),
//   deleteUserActivity: jest.fn(),
// }));

// const { createUserActivity, getUserActivitiesByType, getUserActivityById, updateUserActivity, deleteUserActivity } = require("../../src/db");

// const app = express();
// app.use(express.json());
// app.use("/api/tasks", tasksRouter);

// let server;

// beforeAll((done) => {
//   server = app.listen(done);
// });

// afterAll((done) => {
//   server.close(done);
// });

// describe("Tasks API", () => {
//   describe("POST /api/tasks/createTask", () => {
//     it("should create a new task", async () => {
//       const newTaskId = 1;
//       createUserActivity.mockResolvedValue(newTaskId);

//       const res = await request(app).post("/api/tasks/createTask").send({
//         userid: 1,
//         name: "Test Task",
//         description: "This is a test task",
//         due_date: "2024-12-02T00:00:00.000Z",
//         reminder_datetime: "2024-12-01T12:00:00.000Z",
//         color: "blue",
//         repeat_interval: "none",
//         complete: false,
//         start_time: "2024-12-02T09:00:00.000Z",
//         end_time: "2024-12-02T10:00:00.000Z",
//         streak: 0,
//       });

//       console.log("Response body:", res.body);
//       expect(res.status).toBe(201);
//       expect(res.body).toEqual({
//         ok: true,
//         message: "Task created successfully",
//         body: { activityId: newTaskId },
//       });
//     });
//   });

//   describe("GET /api/tasks/user/:userid", () => {
//     it("should get all tasks for a specific user", async () => {
//       const mockTasks = [
//         { id: 1, name: "Test Task 1" },
//         { id: 2, name: "Test Task 2" },
//       ];
//       getUserActivitiesByType.mockResolvedValue(mockTasks);

//       const res = await request(app).get("/api/tasks/user/1");

//       console.log("Response body:", res.body);
//       expect(res.status).toBe(200);
//       expect(res.body).toEqual({
//         ok: true,
//         message: "Tasks retrieved successfully",
//         body: { tasks: mockTasks },
//       });
//     });
//   });

//   describe("GET /api/tasks/:id", () => {
//     it("should get a specific task by ID", async () => {
//       const mockTask = { id: 1, name: "Test Task" };
//       getUserActivityById.mockResolvedValue(mockTask);

//       const res = await request(app).get("/api/tasks/1");
//       console.log("Response body:", res.body);
//       expect(res.status).toBe(200);
//       expect(res.body).toEqual({
//         ok: true,
//         message: "Task retrieved successfully",
//         body: { task: mockTask },
//       });
//     });
//   });

//   describe("PUT /api/tasks/:id", () => {
//     it("should update a task with the given ID", async () => {
//       updateUserActivity.mockResolvedValue();

//       const res = await request(app).put("/api/tasks/1").send({
//         name: "Updated Test Task",
//         description: "This is an updated test task",
//         due_date: "2024-12-02T00:00:00.000Z",
//         reminder_datetime: "2024-12-01T12:00:00.000Z",
//         color: "red",
//         repeat_interval: "weekly",
//         complete: true,
//         start_time: "2024-12-02T09:00:00.000Z",
//         end_time: "2024-12-02T10:00:00.000Z",
//         streak: 1,
//       });
//       console.log("Response body:", res.body);
//       expect(res.status).toBe(200);
//       expect(res.body).toEqual({
//         ok: true,
//         message: "Task updated successfully",
//       });
//     });
//   });

//   describe("DELETE /api/tasks/:id", () => {
//     it("should delete a task with the given ID", async () => {
//       deleteUserActivity.mockResolvedValue();

//       const res = await request(app).delete("/api/tasks/1");
//       console.log("Response body:", res.body);
//       expect(res.status).toBe(200);
//       expect(res.body).toEqual({
//         ok: true,
//         message: "Task deleted successfully",
//       });
//     });
//   });
// });
