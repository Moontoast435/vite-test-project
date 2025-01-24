import React from "react";
import "./styles.css";

export default function SignUp() {
  return (
    <>
      <div className="signup-container">
        <form>
          <fieldset className="signUpFieldset">
            <label htmlFor="signupUsernameInput">Username: </label>
            <input
              id="signupUsernameInput"
              type="text"
              placeholder="Enter username here"
            ></input>
            <label htmlFor="signupPasswordInput">Password: </label>
            <input
              id="signupPasswordInput"
              type="password"
              placeholder="Enter password here"
            ></input>
            <label htmlFor="signupPasswordInput">Confirm Password: </label>
            <input
              id="signupConfirmPasswordInput"
              type="password"
              placeholder="Enter password confirmation here"
            ></input>
          </fieldset>
        </form>
      </div>
    </>
  );
}
