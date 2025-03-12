import NavBar from "./hocs/NavBar/NavBar";
import { AccountContext, AccountProvider } from "./contexts/AccountContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as Pages from "./Pages/index";
import "./App.css";
import { useContext, useEffect } from "react";
import AuthService from "./AuthService";

function App() {
  const accountContext = useContext(AccountContext);
  const authService = new AuthService();

  useEffect(() => {
    authService.login();
  }, [authService]);

  return (
    <>
      <BrowserRouter>
        <AccountProvider value={accountContext}>
          <NavBar>
            <Routes>
              <Route index element={<Pages.Login />} />
              <Route path="/home" element={<Pages.Home />} />
              <Route path="/signup" element={<Pages.SignUp />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </NavBar>
        </AccountProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
