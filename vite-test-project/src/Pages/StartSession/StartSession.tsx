import React from 'react';
import AuthService from '../../AuthService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const StartSession = () => {
    const authService = new AuthService();
    const navigate = useNavigate();
  
    useEffect(() => {
      authService.handleAuthentication(navigate);
    }, []);

    return (
        <div>
            <p>Starting session...</p>
        </div>
    );
};

export default StartSession;