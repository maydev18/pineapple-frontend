import React from 'react';
import { Icon } from '@iconify/react';
import styles from './ContactUs.module.css'; // Updated to import CSS Module

const ContactUs = () => {
  return (
    <section className={styles.contactUsSection}>
      <h2 className={styles.headingContact}>Contact Us</h2>
      <div className={styles.contactCards}>
        <div className={styles.contactCard}>
          <Icon icon="mdi:map-marker" className={styles.icon} />
          <h3>Our Address</h3>
          <p> X/782, Gandhi Nagar Raghubarpura no 1, East Delhi, 110031</p>
        </div>

        <div className={styles.contactCard}>
        <a href="https://wa.me/+919911501073"><Icon icon="ic:baseline-phone" className={styles.icon} />
          <h3>Whatsapp </h3>
          <p>+91 9911501073</p>
          </a>
        </div>

        <div className={styles.contactCard}>
        <a href="mailto:pineappleindiaofficial@gmail.com"><Icon icon="ic:baseline-email" className={styles.icon} />
          <h3>Email Address</h3>
          pineappleindiaofficial@gmail.com</a> 
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
