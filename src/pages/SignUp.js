// src/components/SignupPage.js
import React from 'react';
import logoBlack from '../images/logo_black.png';
import signupPageBackground from '../images/login_page.png';
import { Link } from 'react-router-dom';
import '../index.css';

const SignupPage = () => {
  return (
    <div className="auth-page">
      <img 
        src={signupPageBackground} 
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
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email address"
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
            <div className="form-actions">
              <button
                type="submit"
                className="button"
              >
                SIGN UP
              </button>
              <div className="auth-link">
              <p>Already have an account? <Link to="/login" className="auth-link-anchor">Log in</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
