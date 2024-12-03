const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const db = require("./queries");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/todos", db.getTodos);

app.get("/todos/:id", db.getTodoById);

app.post("/todos", db.createTodo);

app.put("/todos/:id", db.updateTodo);

app.delete("/todos/:id", db.deleteTodo);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
