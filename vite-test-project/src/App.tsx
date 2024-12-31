import { useEffect, useState } from "react";
import "./App.css";
import edit from "./assets/edit-text.png";
import EditTodo from "./components/EditTodo/EditTodo";
import ClearAllTodos from "./components/ClearAllTodos/ClearAllTodos";

interface Todo {
  id: number;
  description: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(NaN);

  const sendCreateTodo = (description: string) => {
    if (description.trim() == "") {
      alert("No description entered.");
      return;
    }
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

  const onClickEditHandle = () => {
    setOpen(NaN);
    sendGetAllTodos();
  };

  useEffect(() => {
    sendGetAllTodos();
  }, []);

  const sendGetAllTodos = () => {
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
  };

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
          <ClearAllTodos onShow={() => onClickEditHandle()} />
        </div>
        <div className="todos-container">
          {todos &&
            todos.map((todo, i) => (
              <div key={todo.id} className="todo">
                <div className="todo-header">
                  <img
                    src={edit}
                    className="todo-edit-btn"
                    onClick={() => setOpen(i)}
                  />
                </div>
                <p className="todo-description">
                  Description: {todo.description}
                </p>
                <EditTodo
                  todo={todo}
                  onShow={() => onClickEditHandle()}
                  isActive={open === i}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
