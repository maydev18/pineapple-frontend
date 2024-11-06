import React from 'react';
import styles from './AboutUsPage.module.css'; // Importing the CSS module

const aboutUsPage = () => {
  return (
    <div className={styles.aboutUsPage}>
      
      {/* Header Section */}
      <div className={styles.headerBanner}>
        <div className="header-content">
          <h1 className={styles.headerTitle}>ABOUT US</h1>
        </div>
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
        {/* SVG Illustration for Purpose */}
        <div className={styles.svgContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={styles.purposeSvg}>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#6fcf97", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#4caf50", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="30" fill="url(#grad1)" />
            <path d="M32 10a22 22 0 100 44 22 22 0 000-44z" />
            <text x="32" y="35" fontSize="10" textAnchor="middle" fill="#fff">Introversion</text>
          </svg>
        </div>
      </section>

      {/* Design Section */}
      <section className={styles.sectionDesign}>
        {/* SVG Illustration for Designs */}
        <div className={styles.svgContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={styles.purposeSvg}>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#6fcf97", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#4caf50", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="30" fill="url(#grad1)" />
            <path d="M32 10a22 22 0 100 44 22 22 0 000-44z" />
            <text x="32" y="35" fontSize="10" textAnchor="middle" fill="#fff">Minimalist</text>
          </svg>
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
        {/* SVG Illustration for History */}
        <div className={styles.svgContainer}>
          <svg xmlns="../images/1.jpg" viewBox="0 0 64 64" className={styles.purposeSvg}>
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#6fcf97", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "#4caf50", stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="30" fill="url(#grad1)" />
            <path d="M32 10a22 22 0 100 44 22 22 0 000-44z" />
            <text x="32" y="35" fontSize="9" textAnchor="middle" fill="#fff">Quiet, yet bold</text>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default aboutUsPage;
