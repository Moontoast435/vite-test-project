import auth0 from "auth0-js";
import { AUTH_CONFIG } from "../Auth0Config";
import { NavigateFunction } from "react-router-dom";

type AccountStorage = {
  access_token: string;
  id_token: string;
  expires_at: string;
};

export default class AuthService {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.redirectUri,
    audience: AUTH_CONFIG.audience,
    responseType: "token id_token",
    scope: "openid",
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication(navigate: NavigateFunction) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        navigate("/");
      } else if (err) {
        console.log(err);
      }
    });
  }

  setSession(authResult: auth0.Auth0DecodedHash) {
    if (authResult.expiresIn
      && authResult.accessToken
      && authResult.idToken
    ) {
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      const profile = {
        access_token: authResult.accessToken, 
        id_token: authResult.idToken,
        expires_at: expiresAt
      };

      localStorage.setItem('profile', JSON.stringify(profile));

      // localStorage.setItem('access_token', authResult.accessToken);
      // localStorage.setItem('id_token', authResult.idToken);
      // localStorage.setItem('expires_at', expiresAt);
    } else {
      console.error('authResult.expiresIn is undefined');
    }
  }

  isAuthenticated() {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    return new Date().getTime() < profile.expires_at;
  }

  getAccessToken() {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    if (!profile.access_token) {
      throw new Error('No access token found');
    }
    return profile.access_token;
  }

  logout() {
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('id_token');
    // localStorage.removeItem('expires_at');


  }
}
