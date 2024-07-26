import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ProductsShowcase from '../Components/ProductsShowcase';
import ContactUs from '../Components/ContactUs';
import AboutUs from '../Components/AboutUs';
import { ReactTyped as Typed } from 'react-typed';
import styles from './Home.module.css';

const Hero = () => {
  return (
    <>
      <Header/>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className="heading">PINEAPPLE</h1>
          <div className={styles.typedText}>
            <Typed
              strings={[
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
              ]}
              typeSpeed={40}
              backSpeed={50}
              loop
            />
          </div>
          <div className={styles.heroButtons}>
            {/* <Link to="/signup">
              <button className={styles.button}>SIGN UP</button>
            </Link> */}
            <Link to="/productspage">
              <button className="button">BUY NOW</button>
            </Link>
          </div>
        </div>
      </div>
      <ProductsShowcase />
      <AboutUs />
      <ContactUs />
      <Footer />
    </>
  );
};

export default Hero;
