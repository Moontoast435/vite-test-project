import { useEffect, useState, useContext, createContext } from "react";
import TodosInterface from "./features/TodoMainScreen/components/TodosInterface/TodosInterface";
import NavBar from "./hocs/NavBar/NavBar";
import { Account } from "./features/TodoMainScreen/types/todoInterfaceTypes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as Pages from "./Pages/index";
import "./App.css";

const AccountContext = createContext<Account | null>(null);

function App() {
  const [account, setAccount] = useState<Account | null>(null);

  return (
    <>
      <BrowserRouter>
        <AccountContext.Provider value={account}>
          <NavBar>
            <Routes>
              {/* This ensures exact matching for the root path */}
              <Route index element={<Pages.Login />} />
              <Route path="/home" element={<Pages.Home />} />
              <Route path="/signup" element={<Pages.SignUp />} />
              {/* Optional: Redirect any unknown paths to login */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </NavBar>
        </AccountContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
