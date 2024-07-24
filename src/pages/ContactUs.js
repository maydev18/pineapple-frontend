
// src/ContactUs.js
import React from 'react';
import './ContactUs.css';
import placeholderImage from '../images/logo_green.png'; // Make sure to update the path to your placeholder image

const ContactUs = () => {
  return (
    <div className="contact-us-section">
      <h2 className="heading-contact">CONTACT US</h2>
      <div className="circles">
        <div className="circle"><img src={placeholderImage} alt="Placeholder" /></div>
        <div className="circle"><img src={placeholderImage} alt="Placeholder" /></div>
        <div className="circle"><img src={placeholderImage} alt="Placeholder" /></div>
      </div>
    </div>
  );
};

export default ContactUs;
