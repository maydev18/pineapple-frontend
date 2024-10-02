import React from 'react';
import styles from './AboutUs.module.css';
import FadeInComponent from './Fade';
import title from '../images/title_aboutus.png'

const AboutUs = () => {
  return (
    <div className={styles.aboutUsSection} style={{ backgroundImage: `url(https://pineapple-product-images.s3.ap-south-1.amazonaws.com/aboutus.png)` }}>
      <div className={styles.content}>
        <FadeInComponent>
       
         <img src={title}/>

        <p>
        
PINEAPPLE was born from a desire to create more than just clothes. We wanted to craft pieces that would make you feel seen, heard, and understood
who struggled to find clothes that reflected their personality – <strong>quiet, yet bold; reserved, yet expressive</strong>. So, they created PINEAPPLE to fill that gap.

Our t-shirts are designed to be your armor, your comfort zone, and your voice. We use soft fabrics, minimalist designs, and empowering messages to help you express yourself, without screaming.
        
We believe that fashion has the power to transcend mere aesthetics We're a brand that understands the beauty of introversion. We know that sometimes, the most powerful statements are made in silence. That's why we create clothes that help you express yourself, without saying a word.</p>
        </FadeInComponent>
      </div>
    </div>
  );
};

export default AboutUs;
