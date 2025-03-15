import NavBar from "./hocs/NavBar/NavBar";
import { AccountContext, AccountProvider } from "./contexts/AccountContext";
import { Routes, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom'
import * as Pages from "./Pages/index";
import "./App.css";
import { useContext} from "react";
import AuthService from "./AuthService";


function App() {
  const accountContext = useContext(AccountContext);

  const authService = new AuthService();

  const renderHome = () => {
    if (!authService.isAuthenticated()) {
      authService.login();
      return <div><p>Redirecting to the authentication service...</p></div>;
    }
    return <Pages.Home authService={authService} />;
  };



  return (
    <>
      <AccountProvider value={accountContext}>
        <NavBar>
        <Router>
          <Routes>
            <Route path="/" element={renderHome()} />
            <Route path="/startSession" element={<Pages.StartSession/>} />
          </Routes>
        </Router>artSession()
        </NavBar>
      </AccountProvider>    
    </>
  );
}


export default App;
