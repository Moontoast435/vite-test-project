import { PropsWithChildren, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function NavBar(props: PropsWithChildren) {
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToLogIn = () => {
    navigate("/");
  };

  const handleNavigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-title">Todo List</div>
        <div className="navbar-account-buttons">
          {signedIn ? (
            <button>Log out</button>
          ) : (
            <div className="navbar-loggedout-buttons">
              <button onClick={() => handleNavigateToLogIn()}>Log in</button>
              <button onClick={() => handleNavigateToSignUp()}>Sign up</button>
            </div>
          )}
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
