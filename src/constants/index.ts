import { UserManagerSettings, WebStorageStateStore } from "oidc-client";

export const userManagerConfig:UserManagerSettings = {
    authority: 'https://github.com/login/oauth/authorize',
    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
    client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
    redirect_uri: process.env.REACT_APP_LOGIN_CALLBACK_URL,
    response_type: 'code',
    scope: 'openid profile gist user:read user:email',
    post_logout_redirect_uri: process.env.REACT_APP_HOMEPAGE_URL,
    silent_redirect_uri: process.env.REACT_APP_HOMEPAGE_URL+'/silent-renew',
    userStore: new WebStorageStateStore({store: window.localStorage}),
    metadata: {
        authorization_endpoint: 'https://github.com/login/oauth/authorize',
        token_endpoint: process.env.REACT_APP_TOKEN_ACCESS_URL  
    }
};