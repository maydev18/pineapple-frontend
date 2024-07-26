// src/components/LoginPage.js
import React from 'react';
import logoBlack from '../images/logo_black.png';
import loginPageBackground from '../images/login_page.png';
import { Link } from 'react-router-dom';
import classes from './Auth.module.css';
import '../index.css'
const LoginPage = () => {
  return (
    <div className={classes.authPage}>
      <img 
        src={loginPageBackground} 
        className="auth-background" 
        alt="Hero Page" 
      />
      <div className={classes.authOverlay}>
        <div className={classes.authFormContainer}>
          <div className={classes.logoContainer}>
            <img src={logoBlack} alt="Logo" className={classes.logoImage} />
          </div>
          <form className={classes.authForm}>
            <div className={classes.formGroup}>
              <label htmlFor="username" className = {classes.formLabel}>
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className={classes.formInput}
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className={classes.formLabel}>
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className = {classes.formInput}
                placeholder="Enter your password"
              />
            </div>
            <div className={classes.formOptions}>
              <div className="remember-me">
                {/* <input
                  id="remember-me"
                  type="checkbox"
                  className="remember-me-checkbox"
                />
                <label htmlFor="remember-me" className="remember-me-label">
                  Remember me
                </label> */}
              </div>
              <div className = {classes.forgotPassword}>
                <a href="#" className={classes.forgotPasswordLink}>
                  Forget password?
                </a>
              </div>
            </div>
            <div className={classes.formAction}>
              <button className={`${classes.button} button`}
                type="submit"
              >
                LOGIN
              </button>
              <div className={classes.authLink}>
              <p>Don't have an account? <Link to="/signup" className="auth-link-anchor">Sign up</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
