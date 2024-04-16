import { useAuth } from 'react-oidc-context';


export const useLogoutUser = async () => {
    const { signoutRedirect, clearStaleState} = useAuth(); 
    await clearStaleState();

    try {
        await signoutRedirect();
    } catch (e) {
        console.log('Error on signoutRedirect', e);
    }
}