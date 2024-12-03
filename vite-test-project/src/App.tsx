import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import edit from "./assets/edit-text.png";

// Define the type for your object
interface Todo {
  id: number;
  description: string;
  // Add more properties as needed
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // Function to update the todos
  const createTodo = () => {
    if (inputValue != "") {
      setInputValue("");
    } else {
      return;
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetch("https://localhost:44343/api/Todo/GetAllTodos", {
      method: "GET", // Specify the request method (GET by default)
      headers: {
        "Content-Type": "application/json", // Ensure the server knows we're expecting JSON
      },
      mode: "cors", // Enable cross-origin requests
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data); // Set the data in state
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        setError(error.message); // Set error message if there is an error
        setLoading(false); // Set loading to false in case of error
      });
  }, []); // Empty dependency array to run only once when component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error state if something goes wrong
  }

  return (
    <>
      <div className="todo-app-wrapper">
        <h1>Todo-List App</h1>
        <div className="create-todo-container">
          <button onClick={createTodo}>Create Todo</button>
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
          {todos.map((todo) => (
            <div key={todo.id} className="todo">
              <div className="todo-header">
                <p className="todo-id">ID: {todo.id}</p>
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
