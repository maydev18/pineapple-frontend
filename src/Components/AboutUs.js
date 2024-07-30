import React from 'react';
import styles from './AboutUs.module.css';
import backgroundImage from '../images/aboutus.png'; // Make sure to update the path to your image
import FadeInComponent from './Fade';

const AboutUs = () => {
  return (
    <div className={styles.aboutUsSection} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.content}>
        <FadeInComponent>
        <h3 className="sub-heading">about us</h3>
        <h1 className={styles.heading}>WHO WE ARE</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna condimentum mattis pellentesque id nibh tortor id aliquet. Tempor orci eu lobortis elementum.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna condimentum mattis pellentesque id nibh tortor id aliquet. Tempor orci eu lobortis elementum.
        </p>
        </FadeInComponent>
      </div>
    </div>
  );
};

export default AboutUs;
