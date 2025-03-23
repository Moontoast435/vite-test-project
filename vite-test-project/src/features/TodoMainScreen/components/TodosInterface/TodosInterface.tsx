import { useContext, useEffect, useState } from "react";
import "./styles.css";
import edit from "../../../../assets/edit-text.png";
import EditTodo from "../EditTodo/EditTodo";
import ClearAllTodos from "../ClearAllTodos/ClearAllTodos";
import DeleteTodo from "../DeleteTodo/DeleteTodo";
import MarkAsComplete from "../MarkAsComplete/MarkAsComplete";
import { Todo } from "../../types/todoInterfaceTypes";
import { AccountContext } from "../../../../contexts/AccountContext";
import AuthService from "../../../../AuthService";
import { useAuth0 } from "@auth0/auth0-react";
import { AUTH_CONFIG } from "../../../../../Auth0Config";

export default function TodosInterface() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(NaN);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  interface UserMetadata {
    user_id: string;
  }
  
  const [userMetadata, setUserMetadata] = useState<UserMetadata | null>(null);
  const [accessTokenState, setAccessToken] = useState("");

  useEffect(() => {
    if (!user?.sub) return;
    const getUserMetadata = async () => {
      const domain = AUTH_CONFIG.domain;
      console.log("domain: " + domain);
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: AUTH_CONFIG.audience,
            scope: "read:current_user",
          },
        });

        setAccessToken(accessToken);
        const userDetailsByIdUrl = user ? `https://${domain}/api/v2/users/${user.sub}` : "";
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // const metadataText = await metadataResponse.text();
        // console.log("metadataText: " + metadataText);
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata);
        sendGetAllTodos(accessToken);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        } else {
          console.log("An unknown error occurred");
        }
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  const sendCreateTodo = (description: string) => {
    if (description.trim() == "") {
      alert("No description entered.");
      return;
    }
    setLoading(true);
    fetch(
      "https://localhost:44343/api/Todo/CreateTodo?description=" + description,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessTokenState}`
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
        if (todos) {
          setTodos([...todos, data.Todo]);
        } else {
          setTodos([data.Todo]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const onClickEditHandle = () => {
    setOpen(NaN);
    sendGetAllTodos(accessTokenState);
  };

  const sendGetAllTodos = (accessToken : string) => {
    console.log(accessToken);
    fetch("https://localhost:44343/api/Todo/GetAllTodos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
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
        setTodos(data.todos);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="todo-app-wrapper">
      <div className="create-todo-container">
        <button onClick={() => sendCreateTodo(inputValue)}>Create Todo</button>
        <label>Todo: </label>
        <input
          type="text"
          placeholder="enter todo here..."
          onChange={(e) => {
            setInputValue(e.currentTarget.value);
          }}
          value={inputValue}
        ></input>
        <ClearAllTodos onShow={() => onClickEditHandle()} />
      </div>
      <div className="todos-container">
        {todos &&
          todos.filter((todo) => todo.userId.trim() === user?.sub?.trim())
          .map((todo, i) => (
              <div key={todo.id} className="todo">
                <div className="todo-header">
                  <img
                    src={edit}
                    className="todo-edit-btn"
                    onClick={() => setOpen(i)}
                  />
                  <DeleteTodo onShow={() => onClickEditHandle()} todo={todo} />
                </div>
                <p className="todo-description">
                  Description: {todo.description}
                </p>
                <MarkAsComplete
                  onShow={() => onClickEditHandle()}
                  todo={todo}
                />
                <EditTodo
                  todo={todo}
                  onShow={() => onClickEditHandle()}
                  isActive={open === i}
                />
              </div>
            ))}
      </div>
    </div>
  );
}
