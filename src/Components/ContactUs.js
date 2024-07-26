import React from 'react';
import styles from './ContactUs.module.css';
import placeholderImage from '../images/logo_green.png'; // Make sure to update the path to your placeholder image

const ContactUs = () => {
  return (
    <div className={styles.contactUsSection}>
      <h2 className={styles.headingContact}>CONTACT US</h2>
      <div className={styles.circles}>
        <div className={styles.circle}><img src={placeholderImage} alt="Placeholder" /></div>
        <div className={styles.circle}><img src={placeholderImage} alt="Placeholder" /></div>
        <div className={styles.circle}><img src={placeholderImage} alt="Placeholder" /></div>
      </div>
    </div>
  );
};

export default ContactUs;
