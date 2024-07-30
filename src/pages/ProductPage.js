import React from 'react';
import Card from '../Components/Card';
import classes from './ProductPage.module.css';
import { json , useLoaderData , Link} from 'react-router-dom';

const ProductPage = () => {
  const data = useLoaderData();
  const products = data.products;
  return (
    <>
    
      <div className={classes.banner}/>
        {/* <h1 className={classes.mainheading}>Our Products</h1> */}
      <div className={classes.productsPage}>
       

        
        <div className={classes.cardContainer}>
          {products.map((product, index) => (
            <Link to={`/products/${product._id}`} style={{textDecoration : "none"}}>
              <Card
                key={product._id}
                image={product.mainImage}
                hoverImage={product.backImage}
                title={product.title}
                price={product.price}
                titleColor="black"
                priceColor="black"
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;

export async function loader(){
  const response = await fetch('http://localhost:8080/products');
  if (!response.ok) {
      throw json({message : "Could not fetch events"} , {status : 500})
  } 
  return response;
}
