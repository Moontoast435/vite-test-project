import React, { createContext, useState, ReactNode } from "react";
import { Account } from "../features/SignUp/types/accountTypes";
import { AccountContextType } from "../features/SignUp/types/accountTypes";

const defaultValue: AccountContextType = {
  account: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  setAccount: () => {},
};
export const AccountContext = createContext<AccountContextType>(defaultValue);

type AccountProviderProps = {
  children: ReactNode;
  value: AccountContextType;
};

export const AccountProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  return (
    <AccountContext.Provider
      value={{ account: null, isLoggedIn, login, logout, setAccount: () => {} }}
    >
      {children}
    </AccountContext.Provider>
  );
};
