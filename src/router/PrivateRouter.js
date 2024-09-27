import { useEffect , useState} from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {Spinner} from 'react-bootstrap';
const PrivateRoute = () => {
    const { isLoggedIn, login } = useAuth();
    const [initiatingLogin, setInitiatingLogin] = useState(false);

    useEffect(() => {
        if(!isLoggedIn) {
            // Trigger login if the user is not authenticated
            setInitiatingLogin(true);
            login().then(() => setInitiatingLogin(false));  // Trigger login and wait for it to finish
        }
    }, [isLoggedIn]);

    if (initiatingLogin) {
        return <div><Spinner /></div>; // Show a loader while checking auth state or initiating login
    }

    // Once login is completed or user is authenticated, allow access to the route
    return isLoggedIn ? <Outlet /> : <h1>Please log in to access this page.</h1>;
};

export default PrivateRoute;
