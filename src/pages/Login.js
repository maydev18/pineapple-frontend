// src/components/LoginPage.js
import React from 'react';
import logoBlack from '../images/logo_black.png';
import loginPageBackground from '../images/login_page.png';
import { Link } from 'react-router-dom';
import './Auth.css';

const LoginPage = () => {
  return (
    <div className="auth-page">
      <img 
        src={loginPageBackground} 
        className="auth-background" 
        alt="Hero Page" 
      />
      <div className="auth-overlay">
        <div className="auth-form-container">
          <div className="logo-container">
            <img src={logoBlack} alt="Logo" className="logo-image" />
          </div>
          <form className="auth-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="form-input"
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Enter your password"
              />
            </div>
            <div className="form-options">
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
              <div className="forgot-password">
                <a href="#" className="forgot-password-link">
                  Forget password?
                </a>
              </div>
            </div>
            <div className="form-actions">
              <button
                type="submit"
                className="button"
              >
                LOGIN
              </button>
              <div className="auth-link">
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
