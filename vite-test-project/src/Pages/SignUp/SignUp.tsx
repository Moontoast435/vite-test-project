import { FormEvent, useState } from "react";
import {
  Account,
  ErrorSignUp,
} from "../../features/TodoMainScreen/types/todoInterfaceTypes";
import {
  validateUsername,
  validatePassword,
  validatePasswordMatch,
} from "../../utils/validation";

import { sendCreateAccount } from "../../utils/requests";

import "./styles.css";

export default function SignUp() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [error, setError] = useState<ErrorSignUp | null>(null);
  const [createAccountError, setCreateAccountError] = useState<
    string | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    const result = await sendCreateAccount(username, password);

    if (result.success && result.data) {
      setLoading(false);
      return;
    }

    setCreateAccountError(result.error);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const usernameValue = e.target.value;
    setUsernameInput(usernameValue);

    const usernameError = validateUsername(usernameValue);

    setError((prevState) => ({
      usernameError,
      passwordError: prevState?.passwordError ?? null,
      passwordMatchError: prevState?.passwordMatchError ?? null,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPasswordInput(passwordValue);

    const passwordError = validatePassword(passwordValue);

    const passwordMatchError = validatePasswordMatch(
      passwordValue,
      confirmPasswordInput
    );

    setError((prevState) => ({
      usernameError: prevState?.usernameError ?? null,
      passwordError: passwordError,
      passwordMatchError: passwordMatchError,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPasswordValue = e.target.value;
    setPasswordInput(confirmPasswordValue);

    const passwordMatchError = validatePasswordMatch(
      passwordInput,
      confirmPasswordValue
    );

    setError((prevState) => ({
      usernameError: prevState?.usernameError ?? null,
      passwordError: prevState?.passwordError ?? null,
      passwordMatchError: passwordMatchError,
    }));
  };

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
              onChange={handleUsernameChange}
            ></input>
            {error?.usernameError && <div>{error.usernameError}</div>}
            <label htmlFor="signupPasswordInput">Password: </label>
            <input
              id="signupPasswordInput"
              type="password"
              placeholder="Enter password here"
              onChange={handlePasswordChange}
            ></input>
            {error?.passwordError && <div>{error.passwordError}</div>}
            <label htmlFor="signupPasswordInput">Confirm Password: </label>
            <input
              id="signupConfirmPasswordInput"
              type="password"
              placeholder="Enter password confirmation here"
              onChange={handleConfirmPasswordChange}
            ></input>
            {error?.passwordMatchError && <div>{error.passwordMatchError}</div>}
          </fieldset>
          <button type="submit" id="signUpSubmitBtn">
            Create account
          </button>
        </form>
      </div>
    </>
  );
}
