import { useState } from "react";
import { Todo } from "../../types/todoInterfaceTypes";

import "./styles.css";

export default function EditTodo(props: {
  onShow: () => void;
  todo: Todo;
  isActive: Boolean;
}) {
  let { onShow, todo, isActive } = props;
  const [description, setDescription] = useState(todo.description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEditClick = () => {
    sendEditTodo(description);
  };

  const sendEditTodo = (description: string) => {
    fetch(
      "https://localhost:44343/api/Todo/EditTodo?id=" +
        todo.id +
        "&description=" +
        description,
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
        onShow();
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
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
      {isActive && todo && (
        <div className="edit-todo-container">
          <div className="edit-todo-dialog">
            <p>Edit todo</p>
            <label htmlFor="editTodoDescription">Description: </label>
            <input
              type="text"
              id="editTodoDescription"
              placeholder={todo.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
