import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useAuth } from 'react-oidc-context';
import ProfileMenu from '../ProfileMenu/index.tsx';

export const LoginButton:React.FC = () => {
    
  const { user, isLoading, signinRedirect, isAuthenticated} = useAuth(); 

    useEffect(() => {
      if(!isLoading && isAuthenticated && user){

      }
    }, [isLoading, isAuthenticated, user]);

    return (
        isAuthenticated ? 
          <ProfileMenu /> 
          : <Button variant='contained' onClick={signinRedirect} className='login-btn'>
            Login
            </Button>
    );
}
export default LoginButton;