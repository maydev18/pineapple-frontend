import React from 'react';
import classes from './ContactUs.module.css'; 
import group1 from '../images/Group 1.png'; 
import group2 from '../images/Group 2.png'; 
import group3 from '../images/Group 3.png'; 

const ContactUs = () => {
    return (
        <section className={classes.contactUsSection}>
            <h2 className={classes.headingContact}>Contact Us</h2>
            <div className={classes.image}>
                <img src={group1} alt="Placeholder 1" />
                <img src={group2} alt="Placeholder 2" />
                <div className={classes.contactAddress}>
                    <img src={group3} alt="Placeholder 3" />
                </div>
                
            </div>
           
            
        </section>
    );
};

export default ContactUs;
