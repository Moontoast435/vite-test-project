import React from "react";
import "./styles.css";

interface Todo {
  description: string;
  id: number;
}

export default function EditTodo(props: {
  open: Boolean;
  todo: Todo | undefined;
}) {
  const { open, todo } = props;
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
          </div>
        </div>
      )}
    </>
  );
}
