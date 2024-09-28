import React from 'react';
import classes from './ContactUs.module.css'; // Using CSS modules
import group1 from '../images/Group 1.png'; // Ensure the correct image path

const ContactUs = () => {
    return (
        <section className={classes.contactUsSection}>
            <h2 className={classes.headingContact}>Contact Us</h2>
            <div className={classes.image}>
                <img src={group1} alt="Placeholder 1" />
            </div>
        </section>
    );
};

export default ContactUs;
