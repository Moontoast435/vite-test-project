import React from "react";
import TodoInterface from "../../features/TodoMainScreen/components/TodosInterface/TodosInterface";
import AuthService from "../../AuthService";
import { useEffect } from "react";


interface HomeProps {
  authService?: AuthService;
}

export default function Home({ authService }: HomeProps) {

  useEffect(() => {
    if (authService) {
      if (!authService.isAuthenticated()) {
        authService.login();
      }
    }

  }, [authService]);

  return (
    <div>
      {authService?.isAuthenticated() ? (
        <TodoInterface />
      ) : (
        <div>
          <p>Redirecting to the authentication service...</p>
        </div>
      )}
    </div>
  );
}


