import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import classes from './PrivateRouter.module.css';
const PrivateRoute = () => {
    const { isLoggedIn} = useAuth();

    return isLoggedIn ? <Outlet /> : (
        <div className={classes.loginContainer}>
            <div className = {classes.loginCard}>
                <h2>Welcome Back!</h2>
                <p>Please sign in to continue ahead.</p>
            </div>
        </div>
    );
};

export default PrivateRoute;
