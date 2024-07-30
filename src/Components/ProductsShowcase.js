import React from 'react';
import { useInView } from 'react-intersection-observer';
import classes from './ProductsShowcase.module.css';
import { Link, useLoaderData } from 'react-router-dom';
import Card from './Card';

const ProductShowcase = () => {
  const { ref: productRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const data = useLoaderData();
  const products = data.products;
  return (
    <div className={classes.productShowcase}>
      <h2 className={classes.headingProduct}>Our products</h2>

      <div className={classes.cardContainer}>
          {products.map((product, index) => (
           <Link to={`/products/${product._id}`} style={{textDecoration : "none"}}> <Card
              key={index}
              image={product.mainImage}
              hoverImage={product.backImage}
              title={product.title}
              price={product.price}
              color='white'
            /></Link>
          ))}
          <div className={classes.viewAllContainer}>
            
          </div>
         
        </div>
        <button className="button">View All</button>
      
    </div>
  );
};

export default ProductShowcase;
