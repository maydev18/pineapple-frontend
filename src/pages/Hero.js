import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProductsShowcase from '../pages/ProductsShowcase';
import ContactUs from '../pages/ContactUs';
import AboutUs from '../pages/AboutUs';
import { ReactTyped as Typed } from 'react-typed';

const Hero = () => {
  return (
    <>
     <Header/>
      <div className="hero">
        <div className="hero-content">
          <h1 className="heading">PINEAPPLE</h1>
          <div className="typed-text">
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
          <div className="hero-buttons">
            {/* <Link to="/signup">
              <button className="button">SIGN UP</button>
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
