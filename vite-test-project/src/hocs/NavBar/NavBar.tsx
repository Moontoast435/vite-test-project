import { PropsWithChildren } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles.css";

export default function NavBar(props: PropsWithChildren) {
  const { logout } = useAuth0();

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-title">Todo List</div>
        <div className="navbar-account-buttons">
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log out</button>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
}
