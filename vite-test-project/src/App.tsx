import { useEffect, useState } from "react";
import "./App.css";
import edit from "./assets/edit-text.png";

interface Todo {
  id: number;
  description: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const sendCreateTodo = (description: string) => {
    setLoading(true);
    fetch(
      "https://localhost:44343/api/Todo/CreateTodo?description=" + description,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (todos) {
          setTodos([...todos, data.Todo]);
        } else {
          setTodos([data.Todo]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch("https://localhost:44343/api/Todo/GetAllTodos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data.todos);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="todo-app-wrapper">
        <h1>Todo-List App</h1>
        <div className="create-todo-container">
          <button onClick={() => sendCreateTodo(inputValue)}>
            Create Todo
          </button>
          <label>Todo: </label>
          <input
            type="text"
            placeholder="enter todo here..."
            onChange={(e) => {
              setInputValue(e.currentTarget.value);
            }}
            value={inputValue}
          ></input>
        </div>
        <div className="todos-container">
          {todos &&
            todos.map((todo) => (
              <div key={todo.id} className="todo">
                <div className="todo-header">
                  <img src={edit} className="todo-edit-btn" />
                </div>
                <p className="todo-description">
                  Description: {todo.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
