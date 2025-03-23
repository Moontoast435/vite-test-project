import React from 'react';
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

export const StartSession = () => {
    const { loginWithRedirect } = useAuth0();
    useEffect(() => {
      loginWithRedirect();
    }, []);

    return (
        <div>
            <p>Starting session...</p>
        </div>
    );
};

export default StartSession;