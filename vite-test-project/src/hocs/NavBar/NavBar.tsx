import { PropsWithChildren, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function NavBar(props: PropsWithChildren) {
  const [signedIn, setSignedIn] = useState(false);


  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-title">Todo List</div>
        <div className="navbar-account-buttons">
          {signedIn ? (
            <button>Log out</button>
          ) : (
            <div className="navbar-loggedout-buttons">
            </div>
          )}
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
