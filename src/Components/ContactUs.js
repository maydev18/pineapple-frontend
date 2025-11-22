import React from 'react';
import { Icon } from '@iconify/react';
import styles from './ContactUs.module.css'; // Updated to import CSS Module
import { trackClick } from '../analytics';
const ContactUs = () => {
  return (
    <section className={styles.contactUsSection}>
      <h2 className={styles.headingContact}>Contact Us</h2>
      <div className={styles.contactCards}>
        <div className={styles.contactCard}>
          <Icon icon="mdi:map-marker" className={styles.icon} />
          <h3>Our Address</h3>
          <p> Delhi</p>
        </div>

        <div className={styles.contactCard} onClick = {() => {trackClick("whatsapp message button")}}>
        <a href="https://wa.me/+911234567891"><Icon icon="ic:baseline-phone" className={styles.icon} />
          <h3>Whatsapp </h3>
          <p>+91 1234567891</p>
          </a>
        </div>

        <div className={styles.contactCard}>
        <a href="mailto:abc@gmail.com"><Icon icon="ic:baseline-email" className={styles.icon} />
          <h3>Email Address</h3>
          abc@gmail.com</a> 
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
