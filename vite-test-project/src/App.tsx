import { useState, useRef, MutableRefObject } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

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
          <div key={todo.id}>
            <p>ID: {todo.id}</p>
            <p>Description: {todo.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
