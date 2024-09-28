import { createContext, useContext, useState, useEffect } from 'react';
import { useError } from './ErrorContext';
import { GoogleAuthProvider , signInWithPopup} from 'firebase/auth';
import { auth } from '../utils/firebase';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const {showError} = useError();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [user , setUser] = useState(null);
    useEffect(() => {
        setInitialAuthState();
        if(!isTokenValid() && user){
            authenticate();
        }
    } , [user]);
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
        try{
            if(!isTokenValid()){
                const provider = new GoogleAuthProvider();
                const res = await signInWithPopup(auth , provider);
                setUser({
                    name : res.user.displayName,
                    email : res.user.email,
                    email_verified : res.user.emailVerified,
                    photoURL : res.user.photoURL
                })
            }
        }
        catch(err){
            showError("Failed to login");
        }
    }
    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('name');
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
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
        if(duration <= 0){
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
        }
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
    return (
        <AuthContext.Provider value={{ logout, isLoggedIn , login , token}}>
            {children}
        </AuthContext.Provider>
    );
};
