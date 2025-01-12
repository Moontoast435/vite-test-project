import { PropsWithChildren } from "react";

export default function NavBar(props: PropsWithChildren) {
  return (
    <div className="navbar-container">
      <div>{props.children}</div>
    </div>
  );
}
