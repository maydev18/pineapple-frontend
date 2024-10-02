import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import razorpayLogo from '../images/Razorpay_logo.webp'; 
import shiprocketLogo from '../images/shiprocket_logo.png'; 
import { Icon } from '@iconify/react';
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
          <h3>Quick Link</h3>
          <ul>
            <li><Link to="/terms">Terms and Conditions</Link></li>
            <li>
              <p style={{textTransform : "none"}}>Our website: thepineapple.in</p>
              <p>For any inquiries, feel free to contact us at</p>
              <p style={{ textTransform: 'none' }}>
                pineappleindiaofficial@gmail.com
              </p>
            </li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3>Work Hours</h3>
          <p>7:00 am to 12:00pm<br />Monday to Saturday</p>
        </div>

        <div className={styles.footerColumn}>
          <h3>Delivery & Payment Partners</h3>
          <div className={styles.partners}>
            <div className={styles.partner}>
              <img src={razorpayLogo} alt="Razorpay" className={styles.partnerLogo} />
              <p>Razorpay</p>
            </div>
            <div className={styles.partner}>
              <img src={shiprocketLogo} alt="Shiprocket" className={styles.partnerLogo} />
              <p>Shiprocket</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2024 Pineapple | All rights reserved</p> 
        <div className={styles.socialMediaIcons}>
                <a href="https://www.instagram.com/thepineapple.in_?igsh=MTg1azk5MTY1aXU0dQ==" target="_blank" rel="noopener noreferrer" >
                  <Icon icon="mdi:instagram" width="18" height="18" color='white' style={{margin: '0 6px'}}/>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61855791867340&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" >
                  <Icon icon="mdi:facebook" width="18" height="18" color='white' style={{margin: '0 6px'}}/>
                </a>
              </div>
      </div>
    </div>
  );
};

export default Footer;
