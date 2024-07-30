import React from 'react';
import { Link , json} from 'react-router-dom';
import ProductsShowcase from '../Components/ProductsShowcase';
import ContactUs from '../Components/ContactUs';
import AboutUs from '../Components/AboutUs';
import FadeInComponent from '../Components/Fade';
import { ReactTyped as Typed } from 'react-typed';
import classes from './Home.module.css';



const Hero = () => {
  return (
    <>  
      <div className={classes.hero}>
        <div className={classes.heroContent}>
        {/* <h4>Explore new-in products and bestsellers</h4> */}
        <FadeInComponent>
          <h1 className="heading">SET THE STANDARD</h1>
        
          <div className={classes.typedText}>
            <p>loreMinim excepteur nisi nulla ad eiusmod voluptate aute ipsum id dolore.
               Quis enim tempor magna eu cupidatat proident cupidatat labore veniam. 
              </p>
          </div>
          <div className={classes.heroButtons}>
            {/* <Link to="/signup">
              <button className={classes.button}>SIGN UP</button>
            </Link> */}
            <Link to="/products">
              <button  className="button">BUY NOW</button>
            </Link>
           
          </div>
          </FadeInComponent>
        </div>
        
      </div> 
    
 
      <ProductsShowcase />
      <AboutUs />
      <ContactUs />
    </>
  );
};

export default Hero;

export async function loader(){
  try{
    const response = await fetch('http://localhost:8080/top-products');
    return response;
  }
  catch(err){
    throw json({message : "Could not fetch events"} , {status : 500})
  }
}
