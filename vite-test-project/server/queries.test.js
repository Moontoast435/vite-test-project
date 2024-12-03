const request = require("supertest");
const express = require("express");
const { Pool } = require("pg");
const app = express();

const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("./queries"); // Import your functions

// Mock the pg pool methods
jest.mock("pg", () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const pool = new Pool();

// Use express to handle your API routes
app.use(express.json());
app.get("/todos", getTodos);
app.get("/todos/:id", getTodoById);
app.post("/todos", createTodo);
app.put("/todos/:id", updateTodo);
app.delete("/todos/:id", deleteTodo);

describe("Todo API Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  jest.setTimeout(30000);

  it("should fetch all todos", async () => {
    console.log("Test started...");

    jest.setTimeout(10000); // Increase timeout to 10 seconds

    const mockData = [{ id: 1, description: "Test Todo" }];
    pool.query.mockResolvedValueOnce({ rows: mockData });

    console.log("Making request...");
    const response = await request(app).get("/todos");
    console.log("Request completed.");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  it("should fetch a todo by id", async () => {
    const mockData = [{ id: 1, description: "Test Todo" }];

    pool.query.mockResolvedValueOnce({ rows: mockData });

    const response = await request(app).get("/todos/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  it("should create a new todo", async () => {
    const newTodo = { description: "New Todo" };

    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    const response = await request(app).post("/todos").send(newTodo);

    expect(response.status).toBe(201);
    expect(response.text).toContain("Todo added with id:");
  });

  it("should update a todo", async () => {
    const updatedTodo = { description: "Updated Todo" };

    pool.query.mockResolvedValueOnce({ rowCount: 1 });

    const response = await request(app).put("/todos/1").send(updatedTodo);

    expect(response.status).toBe(200);
    expect(response.text).toContain("User updated with id = 1");
  });

  it("should delete a todo", async () => {
    const mockData = [{ id: 1, description: "Test Todo" }];

    pool.query.mockResolvedValueOnce({ rows: mockData });

    const response = await request(app).delete("/todos/1");

    expect(response.status).toBe(200);
    expect(response.text).toContain("User deleted with id = 1");
  });
});
