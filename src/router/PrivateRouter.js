import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import classes from './PrivateRouter.module.css';
const PrivateRoute = () => {
    const { isLoggedIn , login} = useAuth();

    return isLoggedIn ? <Outlet /> : (
        <div className={classes.loginContainer}>
            <div className = {classes.loginCard}>
                <h2>Welcome Back!</h2>
                <p>Please log in to continue ahead.</p>
                <button onClick={() => {login()}} className={classes.loginButton}>Login wth Google</button>
            </div>
        </div>
    );
};

export default PrivateRoute;
