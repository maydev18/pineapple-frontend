// src/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>PINEAPPLE</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
          {/* <form className="email-form">
            <input type="email" placeholder="Email" />
            <button type="submit">Submit</button>
          </form> */}
        </div>
        <div className="footer-column">
          <h3>Navigation</h3>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Quick link</h3>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Work Hours</h3>
          <p>7:00 am to 12:00pm<br />Monday to Saturday</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Pineapple | All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
