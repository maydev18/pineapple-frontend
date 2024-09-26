import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useError } from './ErrorContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const {showError} = useError();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [isLoading , setIsLoading] = useState(true);
    const { loginWithRedirect, user, isAuthenticated , logout} = useAuth0();
    useEffect(() => {
        setInitialAuthState();
        if(!isTokenValid() && user){
            authenticate();
        }
    } , [isAuthenticated]);
    const authenticate = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_BASE_URL + 'auth/authenticate', {
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(user),
                method: 'post'
            })
            if (!res.ok) {
                const err = await res.json();
                throw err;
            }
            const details = await res.json();
            saveDetails(details.token , details.name);
            setIsLoggedIn(true);
            setToken(details.token);
            showError('Logged in successfully', 'success');
        }
        catch (err) {
            showError(err);
        }
    }
    async function login(){
        if(!isTokenValid()){
            await loginWithRedirect();
        }
    }
    function Logout() {
        logout();
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('name');
        setIsLoggedIn(false);
    }
    function setInitialAuthState() {
        if(isTokenValid()){
            setToken(localStorage.getItem("token"));
            setIsLoggedIn(true);
        }
        else{
            setToken(null);
            setIsLoggedIn(false);
        }
        setIsLoading(false);
    }
    function isTokenValid(){
        const token = localStorage.getItem('token');
        if(!token || getTokenDuration() <= 0) return false;
        return true;
    }
    function getTokenDuration() {
        const expiration = localStorage.getItem('expiration');
        if (!expiration) return -1;
        const date = new Date(expiration);
        const now = new Date();
        const duration = date.getTime() - now.getTime();
        return duration;
    }
    function saveDetails(token , name){
        localStorage.setItem("token" , token);
        localStorage.setItem("name" , name);
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 30);
        localStorage.setItem('expiration' , expiration.toISOString());
        localStorage.setItem("expiration" , expiration);
    }
    console.log(isLoggedIn , token);
    return (
        <AuthContext.Provider value={{ Logout, isLoggedIn , login , token , isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};
