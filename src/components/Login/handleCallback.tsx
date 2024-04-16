import React from "react";
import { useEffect } from "react";
import {User, UserManager} from 'oidc-client';
import { useAuth } from 'react-oidc-context';
import { userManagerConfig } from "../../constants/index.ts";

export const HandleLoginCallback:React.FC = () => {
    const userManager = new UserManager(userManagerConfig);
    const auth = useAuth();

    useEffect(() => {
      getAccessToken();
    }, []);

    useEffect(() => {
      if(auth.isAuthenticated){
        saveUserInfo();
      }
    }, [auth.isAuthenticated]);
    
    const getAccessToken = async () => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
          try {
            await userManager.signinSilentCallback();
          } catch (error) {
            console.error('Error getting access token:', error);
            alert('Login failed. Please try again.');
          }
        }
    };
    
    const saveUserInfo = async () => {
      try {
        const response = await fetch('https://api.github.com/user', {
          headers: {
            'Authorization': `Bearer ${auth.user?.access_token}`,
            'accept': 'application/vnd.github+json'
          },
        });
    
        if (response.ok) {
          const userData = await response.json();
          const _userData = {
            ...auth.user, profile: userData, access_token: auth.user?.access_token || ''
          };
          _userData['toStorageString'] = () => JSON.stringify(_userData); 
          await userManager.storeUser(_userData as User);
          window.location.href = "/";
        } else {
          console.error('Error fetching user info:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user info(catch):', error);
      }
    };

    return (<></>);
};
export default HandleLoginCallback