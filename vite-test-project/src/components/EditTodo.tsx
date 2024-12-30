import { useState } from "react";
import "./styles.css";

interface Todo {
  description: string;
  id: number;
}

export default function EditTodo(props: { open: Boolean; todo: Todo }) {
  const { open, todo } = props;

  const handleEditClick = () => {};

  const sendEditTodo = () => {
    fetch(
      "https://localhost:44343/api/Todo/EditTodo?id=" +
        todo.id +
        "&description=" +
        todo.description,
      {
        method: "PUT",
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
        // setEditOpen(false);
      })
      .catch((error) => {});
  };

  return (
    <>
      {open && todo && (
        <div className="edit-todo-container">
          <div className="edit-todo-dialog">
            <p>Edit todo</p>
            <label htmlFor="editTodoDescription">Description: </label>
            <input
              type="text"
              id="editTodoDescription"
              placeholder={todo.description}
            ></input>
            <button
              className="edit-todo-button"
              onClick={() => handleEditClick()}
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
