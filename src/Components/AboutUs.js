import React from 'react';
import styles from './AboutUs.module.css';
import backgroundImage from '../images/About.png'; // Make sure to update the path to your image

const AboutUs = () => {
  return (
    <div className={styles.aboutUsSection} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.content}>
        <h3 className={styles.subHeading}>about us</h3>
        <h1>WHO WE ARE</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna condimentum mattis pellentesque id nibh tortor id aliquet. Tempor orci eu lobortis elementum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna condimentum mattis pellentesque id nibh tortor id aliquet. Tempor orci eu lobortis elementum.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
