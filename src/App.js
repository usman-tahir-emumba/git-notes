import './App.css';
import { BrowserRouter } from "react-router-dom";
import {Route} from "./routes/route.js";
import { UserManager } from 'oidc-client-ts';
import { userManagerConfig } from './constants/index.ts';
import { AuthProvider } from 'react-oidc-context';


import { useEffect } from 'react';

function App() {
  const userManager = new UserManager(userManagerConfig);
  // userManager.signinCallback = () => {
  //   alert('Signin Callback');
  // }

  return (
    <div className="App">
      <AuthProvider userManager={userManager}>
        <BrowserRouter children={Route} basename={"/"} />
       </AuthProvider>
    </div>
  );
}

export default App;
