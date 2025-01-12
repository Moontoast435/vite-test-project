import { useState } from "react";
import "./styles.css";

export default function ClearAllTodos(props: { onShow: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { onShow } = props;

  const sendClearAllTodos = () => {
    fetch("https://localhost:44343/api/Todo/DeleteAllTodos", {
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
    <div className="clearAllTodos-container">
      <button
        className="clearAllTodos-button"
        onClick={() => sendClearAllTodos()}
      >
        Delete All Todos
      </button>
    </div>
  );
}
