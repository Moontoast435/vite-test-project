import NavBar from "./hocs/NavBar/NavBar";
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import * as Pages from "./Pages/index";
import "./App.css";
import { Auth0Provider } from '@auth0/auth0-react';
import { AUTH_CONFIG } from "../Auth0Config";


function App() {

  return (
    <>
      <Auth0Provider
    domain={AUTH_CONFIG.domain}
    clientId={AUTH_CONFIG.clientID}
    authorizationParams={{
      redirect_uri: AUTH_CONFIG.redirectUri,
      audience: `https://${AUTH_CONFIG.domain}/api/v2/`,
      scope: "read:current_user update:current_user_metadata"
    }}
      > 
      <Router>
        <NavBar>
          <Routes>
            <Route path="/" element={<Pages.StartSession/>}/>
            <Route path="/Home" element={<Pages.Home/>} />
          </Routes>
        </NavBar>
      </Router>    
      </Auth0Provider>    
    </>
  );
}


export default App;
