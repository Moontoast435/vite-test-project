import { useState } from "react";
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
  const [inputValue, setInputValue] = useState("");

  // Function to update the todos
  const updateTodos = () => {
    // Example of updating the array with a new object
    setTodos([...todos, { id: todos.length + 1, description: inputValue }]);
    setInputValue("");
  };

  return (
    <>
      <div className="todo-app-wrapper">
        <h1>Todo-List App</h1>
        <div className="create-todo-container">
          <button onClick={updateTodos}>Create Todo</button>
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
