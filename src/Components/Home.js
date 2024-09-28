import React from 'react';
import { Link , json} from 'react-router-dom';
import ProductsShowcase from '../Components/ProductsShowcase';
import ContactUs from '../Components/ContactUs';
import AboutUs from '../Components/AboutUs';
import FadeInComponent from '../Components/Fade';
import classes from './Home.module.css';



const Hero = () => {
  return (
    <>  
      <div className={classes.hero}>
        <div className={classes.heroContent}>
        {/* <h4>Explore new-in products and bestsellers</h4> */}
        <FadeInComponent>
          <h1 className="sub-heading">Set the Standard</h1>
        
          <div className={classes.typedText}>
            <p>We, at PINEAPPLE, redefine modern fashion with a blend of quiet confidence and bold expression. Embrace a style that speaks subtly yet leaves a lasting impression.
              </p>
              <p>Check out our collection now!</p>
          </div>
          <div className={classes.heroButtons}>
           
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
    const response = await fetch(process.env.REACT_APP_BASE_URL + 'top-products');
    return response;
  }
  catch(err){
    throw json({message : "Could not fetch events"} , {status : 500})
  }
}
