import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorSignUp } from "../../features/TodoMainScreen/types/todoInterfaceTypes";
import {
  validateUsername,
  validatePassword,
  validatePasswordMatch,
} from "../../utils/validation";

import { AccountContext } from "../../contexts/AccountContext";

import { sendCreateAccount } from "../../utils/requests";

import { Account } from "../../features/SignUp/types/accountTypes";

type AccountCreatedResponse = {
  StatusCode: string;
  Message: string;
  Account: Account;
};

import "./styles.css";

export default function SignUp() {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [error, setError] = useState<ErrorSignUp | null>(null);

  const [accountCreatedResponse, setAccountCreatedResponse] =
    useState<AccountCreatedResponse | null>(null);

  const navigate = useNavigate();

  const [createAccountError, setCreateAccountError] = useState<
    string | undefined
  >(undefined);

  const [loading, setLoading] = useState(false);

  const accountContext = useContext(AccountContext);

  const { account, setAccount } = accountContext;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await sendCreateAccount(usernameInput, passwordInput);

    if (result.success && result.data) {
      setLoading(false);
      setAccountCreatedResponse(result.data);

      if (result.data.Account) {
        setAccount(result.data.Account);
        navigate("/home");
      }
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
    if (passwordInput === "") {
      return;
    }
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
        <form onSubmit={handleFormSubmit}>
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
          <button
            id="signUpSubmitBtn"
            disabled={
              !!error?.usernameError ||
              !!error?.passwordError ||
              !!error?.passwordMatchError
            }
            type="submit"
          >
            Create account
          </button>
        </form>
      </div>
    </>
  );
}
