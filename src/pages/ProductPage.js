import React from 'react';
import Card from '../Components/Card';
import classes from './ProductPage.module.css';
import { json , useLoaderData , Link} from 'react-router-dom';

const ProductPage = () => {
  const data = useLoaderData();
  const products = data.products;
  return (
    <>
      <h1 className={classes.ProductsPageHeading}>Our Products</h1>
      <div className={classes.productsPage}>
        <div className={classes.cardContainer}>
          {products.map((product, index) => (
            <Link to={`/products/${product._id}`} style={{textDecoration : "none"}} key={product._id}>
              <Card
                color = 'black'
                key={product._id}
                image={product.mainImage}
                hoverImage={product.backImage}
                title={product.title}
                price={product.price}
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
  try{
    const response = await fetch('http://localhost:8080/products');
    return response;
  }
  catch(err){
    throw json({message : "Could not fetch events"} , {status : 500})
  }
}
