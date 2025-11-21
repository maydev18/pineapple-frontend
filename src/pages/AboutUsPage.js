import React from 'react';
import styles from './AboutUsPage.module.css'; 
import aboutus1 from '../images/about1.jpeg';
import aboutus2 from '../images/about2.png';
import aboutus3 from '../images/about3.png';
import useScrollDepth from '../hooks/useScrollDepth';
const AboutUsPage = () => {
  useScrollDepth();
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
            yourself, without saying a word. <br/> At Pineapple , we consider clothing an extension of who you are. Our reason is to empower people through style that blends consolation, functionality, and self-expression. We’re devoted to offering exceptional clothing that makes you feel assured, stylish, and prepared to conquer the world.  


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
            
Every piece in our collection is thoughtfully crafted with you in mind. From everyday necessities to ambitious statement pieces, our designs have a good time range and individuality. We satisfaction ourselves on:  
Uncompromising Quality: Using top rate fabric and materials for sturdiness and comfort.<br/>  <br/>  
<strong>Timeless Style: </strong>Creating flexible designs that adapt to ever-changing tendencies.  <br/>  
<strong>Sustainability:</strong> Incorporating eco-friendly practices, from responsibly sourced fabrics to environmentally conscious packaging.<br/>    
<strong>Inclusive Fashion:</strong> Catering to all sizes, shapes, and private patterns due to the fact everybody deserves to appear and sense top notch.<br/>  

          </p>
        </div>
      </section>

      {/* Brand History Section */}
      <section className={styles.sectionHistory}>
        <div className={styles.textBlock}>
          <h2>Our Future Goals</h2>
          <p>
          As we grow, so does our commitment to making a superb effect on the area. Here’s what we envision:<br/><br/>
<strong>Expanding Sustainability Efforts:</strong> Innovating our methods to be one hundred% carbon-impartial and increasing using recycled materials.<br/>
<strong>Global Reach: </strong>Bringing our unique designs to fashion fanatics international while collaborating with artisans to sell traditional craftsmanship.  <br/>
<strong>Community Building:</strong> Partnering with organizations to guide underprivileged groups and pressure significant alternatives.  <br/>
<strong>Community Building:</strong> Partnering with organizations to guide underprivileged groups and pressure significant alternatives.  <br/>
<strong>Empowering Creativity:</strong> Continuously pushing boundaries to inspire creativity, individuality, and self belief in our customers.<br/>

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
