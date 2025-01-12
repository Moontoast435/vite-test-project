import React from "react";
import "./styles.css";
import bin from "../../../../assets/bin.png";

interface Todo {
  description: string;
  id: number;
}

export default function DeleteTodo(props: { onShow: () => void; todo: Todo }) {
  let { onShow, todo } = props;

  const handleDeleteTodo = () => {
    sendDeleteTodo(todo.id);
  };

  const sendDeleteTodo = (id: Number) => {
    fetch("https://localhost:44343/api/Todo/DeleteTodo?id=" + id, {
      method: "DELETE",
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
        onShow();
        console.log(data);
      })
      .catch((error) => {});
  };

  return (
    <>
      <img
        className="delete-todo-icon"
        onClick={() => handleDeleteTodo()}
        src={bin}
      />
    </>
  );
}
