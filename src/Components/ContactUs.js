import React from 'react';
import classes from './ContactUs.module.css'; // Using CSS modules
import group1 from '../images/Group 1.png';
import group2 from '../images/Group 2.png';
import group3 from '../images/Group 3.png';

const ContactUs = () => {
    return (
        <section className={classes.contactUsSection}>
            <h2 className={classes.headingContact}>Contact Us</h2>
            <div className={classes.circles}>
                <div className={classes.circle}>
                    <img src={group1} alt="Placeholder 1" />
                </div>
                <div className={classes.circle}>
                    <img src={group2} alt="Placeholder 2" />
                </div>
                <div className={classes.circle}>
                    <img src={group3} alt="Placeholder 3" />
                </div>
            </div>
            <div className={classes.contactDetails}>
                <p>For any inquiries, feel free to contact us at:</p>
                <p><strong>Email:</strong> contact@classicglobal.com</p>
                <p><strong>Phone:</strong> +123 456 7890</p>
            </div>
        </section>
    );
};

export default ContactUs;

