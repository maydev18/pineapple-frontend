import React from 'react';
import { Link } from 'react-router-dom';
import ProductsShowcase from '../Components/ProductsShowcase';
import ContactUs from '../Components/ContactUs';
import AboutUs from '../Components/AboutUs';
import { ReactTyped as Typed } from 'react-typed';
import classes from './Home.module.css';


const Hero = () => {
  return (
    <>
      <div className={classes.hero}>
        <div className={classes.heroContent}>
          <h1 className="heading">PINEAPPLE</h1>
          <div className={classes.typedText}>
            <Typed
              strings={[
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
              ]}
              typeSpeed={40}
              backSpeed={50}
              loop
              style= {{color: "#f0e5d8"}}
            />
          </div>
          <div className={classes.heroButtons}>
            {/* <Link to="/signup">
              <button className={classes.button}>SIGN UP</button>
            </Link> */}
            <Link to="/productspage">
              <button  className="button">BUY NOW</button>
            </Link>
          </div>
        </div>
      </div>
      <ProductsShowcase />
      <AboutUs />
      <ContactUs />
    </>
  );
};

export default Hero;
