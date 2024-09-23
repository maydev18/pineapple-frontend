import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <h3>PINEAPPLE</h3>
          <p>We redefine modern fashion with a blend of quiet confidence and bold expression. Embrace a style that speaks subtly yet leaves a lasting impression.</p>
          <div className={styles.socialIcons}>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>

        <div className={styles.footerColumn}>
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Our Products</Link></li>
            <li><Link to="/orders">My orders</Link></li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3>Quick link</h3>
          <ul>
            <li><Link to="/terms">terms and conditions</Link></li>
            <li> <p>For any inquiries, feel free to contact us at:</p>
                <p style={{textTransform:"none"}}>pineappleindiaofficial@gmail.com  +91 9911501073</p></li>
               
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
