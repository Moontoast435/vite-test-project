import NavBar from "./hocs/NavBar/NavBar";
import { AccountProvider } from "./contexts/AccountContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as Pages from "./Pages/index";
import "./App.css";

function App() {

  return (
    <>
      <BrowserRouter>
        <AccountProvider>
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
