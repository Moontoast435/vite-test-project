const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

const getTodos = async (request, response) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
    response.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting todos:", error);
    response.status(500).send("Error fetching todos");
  }
};

const getTodoById = async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    response.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting todo by id:", error);
    response.status(500).send("Error fetching todo by id");
  }
};

const createTodo = async (request, response) => {
  try {
    const { description } = request.body;
    const result = await pool.query(
      "INSERT INTO todos (description) VALUES ($1)",
      [description]
    );
    response.status(201).send(`Todo added with id: ${result.insertId}`);
  } catch (error) {
    console.error("Error creating todo", error);
    response.status(500).send("Error creating todo");
  }
};

const updateTodo = async (request, response) => {
  try {
    const id = request.params.id;
    const { description } = request.body;

    const result = await pool.query(
      "UPDATE todos SET description = $1 WHERE id = $2",
      [description, id]
    );

    response.status(200).send(`User updated with id = ${id}`);
  } catch (error) {
    console.error("Error updating todo", error);
    response.status(500).send("Error updating todo");
  }
};

const deleteTodo = async (request, response) => {
  try {
    const id = request.params.id;

    const result = await pool.query("DELETE FROM todos WHERE id = $1", [id]);

    response.status(200).send(`User deleted with id = ${id}`);
  } catch (error) {
    console.error("Error deleting todo", error);
    response.status(500).send("Error deleting todo");
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
