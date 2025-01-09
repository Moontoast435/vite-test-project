interface Todo {
  description: string;
  id: number;
  complete: boolean;
  userId: string;
}

export default function MarkAsComplete(props: {
  onShow: () => void;
  todo: Todo;
}) {
  const { onShow, todo } = props;

  const handleCheckboxChange = () => {
    sendToggleComplete(todo.id);
  };

  const sendToggleComplete = (id: number) => {
    fetch("https://localhost:44343/api/Todo/ToggleComplete?id=" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
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
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <input
        className="mark-as-complete-checkbox"
        type="checkbox"
        onChange={() => handleCheckboxChange()}
        checked={todo.complete}
      ></input>
    </div>
  );
}
