import React from 'react';
import styles from './AboutUsPage.module.css'; 
import aboutus1 from '../images/about1.jpeg';
import aboutus2 from '../images/about2.png';
import aboutus3 from '../images/about3.png';

const AboutUsPage = () => {
  return (
    <div className={styles.aboutUsPage}>
      
      {/* Header Section */}
      <div className={styles.headerBanner}>
       
          <h1 className={styles.headerTitle} style={{marginBottom: '1rem'}}>ABOUT US</h1>
          <p>
            
            Welcome to Pineapple, in which fashion meets comfort and every piece tells a story. We’re a team of fashion lovers dedicated to growing clothing that celebrates individuality, comfort, and self belief. At Pineapple, we consider that what you wear should be as precise and vibrant as you are.
            
            Our adventure started with a simple vision to design apparel that makes a statement while making sure great quality and latest design in each sew. We supply the greatest fabrics and put craftsmanship at the heart of everything we create, ensuring that each Pineapple piece feels as desirable as it looks. From undying essentials to trending designs, our collections are thoughtfully curated to offer something for absolutely everyone, whether or not you’re dressing for a casual day out or a unique event. Our determination to sustainability and moral practices is woven into the material of Pineapple, as we always work to reduce the aspect results at the surroundings. We design one-of-a-kind forms of tshirts for each ladies and men. The quality and design of the tshirts is designed according to the customer’s mindset. If you are looking for the best oversized t shirt in the market. This is the right place. 
            
            Explore Pineapple, and discover the portions that sense like they have been made only for you. Thank you for being part of our journey we’re pleased to be a part of yours.
            
                      </p>
        </div>
      
      <div className={styles.aboutussection}>
     
      </div>
      {/* Purpose Section */}
      <section className={styles.sectionPurpose}>
        <div className={styles.textBlock}>
          <h2>Our Purpose...</h2>
          <p>
            We believe that fashion has the power to transcend mere aesthetics. We're a brand that understands the beauty of introversion. 
            We know that sometimes, the most powerful statements are made in silence. That's why we create clothes that help you express 
            yourself, without saying a word.
          </p>
        </div>
        {/* Image for Purpose */}
        <div className={styles.imageContainer}>
          <img src={aboutus2} alt="Purpose Illustration" className={styles.responsiveImage} />
        </div>
      </section>

      {/* Design Section */}
      <section className={styles.sectionDesign}>
        {/* Image for Designs */}
        <div className={styles.imageContainer}>
          <img src={aboutus3} alt="Design Illustration" className={styles.responsiveImage} />
        </div>
        <div className={styles.textBlock}>
          <h2>Our Designs</h2>
          <p>
            Our t-shirts are designed to be your armor, your comfort zone, and your voice. We use soft fabrics, minimalist designs, and empowering 
            messages to help you express yourself, without screaming.
          </p>
        </div>
      </section>

      {/* Brand History Section */}
      <section className={styles.sectionHistory}>
        <div className={styles.textBlock}>
          <h2>ABOUT US...</h2>
          <p>
            PINEAPPLE was born from a desire to create more than just clothes. We wanted to craft pieces that would make you feel seen, heard, 
            and understood. WHO struggled to find clothes that reflected their personality – quiet, yet bold; reserved, yet expressive. So, 
            they created PINEAPPLE to fill that gap.
          </p>
        </div>
        {/* Image for History */}
        <div className={styles.imageContainer}>
          <img src={aboutus1} alt="History Illustration" className={styles.responsiveImage} />
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
