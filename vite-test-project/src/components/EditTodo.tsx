import React from "react";
import "./styles.css";

interface EditTodoProps {
  description: string;
  id: number;
}

export default function EditTodo({ description, id }: EditTodoProps) {
  return (
    <>
      <div className="edit-todo-container">
        <div className="edit-todo-dialog">
          <p>Edit todo</p>
          <label htmlFor="editTodoDescription">Description: </label>
          <input
            type="text"
            id="editTodoDescription"
            placeholder={description}
          ></input>
        </div>
      </div>
    </>
  );
}
