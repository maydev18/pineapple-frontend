import React from 'react';
import logoBlack from '../images/logo_black.png';
import authPageBackground from '../images/login_page.png';
import { Link } from 'react-router-dom';
import classes from './CombinedAuthPage.module.css';

const CombinedAuthPage = ({ isSignup }) => {
  return (
    <div className={classes.authPage}>
      <img 
        src={authPageBackground} 
        className={classes.authBackground} 
        alt="Hero Page" 
      />
      <div className={classes.authOverlay}>
        <div className={classes.authFormContainer}>
          <div className={classes.logoContainer}>
            <img src={logoBlack} alt="Logo" className={classes.logoImage} />
          </div>
          <form className={classes.authForm}>
            <div className={classes.formGroup}>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="email" className={classes.formLabel}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                className={classes.formInput}
                placeholder="Enter your email address"
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="password" className={classes.formLabel}>
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className={classes.formInput}
                placeholder="Enter your password"
              />
            </div>
            <div className={classes.formActions}>
              <button
                type="submit"
                className="button"
              >
                {isSignup ? 'SIGN UP' : 'LOG IN'}
              </button>
              <div className={classes.authLink}>
                {isSignup ? (
                  <p>Already have an account? <Link to="/login" className={classes.authLinkAnchor}>Log in</Link></p>
                ) : (
                  <p>Don't have an account? <Link to="/signup" className={classes.authLinkAnchor}>Sign up</Link></p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CombinedAuthPage;
