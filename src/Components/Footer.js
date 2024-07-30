import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <h3>PINEAPPLE</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
          <div className={styles.socialIcons}>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
          
        </div>
        <div className={styles.footerColumn}>
          <h3>Navigation</h3>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3>Quick link</h3>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3>Work Hours</h3>
          <p>7:00 am to 12:00pm<br />Monday to Saturday</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 Pineapple | All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
