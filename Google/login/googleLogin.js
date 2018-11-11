import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

/**
 * Login with Google
 * @returns Token Google
 */
export const googleLogin = async () => {
    try {
        await GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '534977378879-1fohcvd1s8rl5sc67hinnp94t3h72c8t.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: false // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });

        const data = await GoogleSignin.signIn();

        // create a new firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);

        // login with credential
        await firebase.auth().signInWithCredential(credential);

        return (data);

    } catch (error) {
        const { code, message } = error;
    }
}

/**
 * Google Sign Out
 * @description Remove user session from the device.
 */
export const googleSignOut = async () => {
    try {
        // Remove your application from the user authorized applications.
        await GoogleSignin.revokeAccess();

        await GoogleSignin.signOut();

        // signout firebase authentication 
        await firebase.auth().signOut();
    } catch (error) {
        console.error(error);
    }
};

export const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
};