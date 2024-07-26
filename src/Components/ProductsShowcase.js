import React from 'react';
import { useInView } from 'react-intersection-observer';
import classes from './ProductsShowcase.module.css';
import back from '../images/back.jpg';

const products = [
  { id: 1, image: back, title: 'White Regular Fit T-Shirt', price: 'Rs 1000.00' },
  { id: 2, image: back, title: 'White Regular Fit T-Shirt', price: 'Rs 1000.00' },
  { id: 3, image: back, title: 'White Regular Fit T-Shirt', price: 'Rs 1000.00' },
  // { id: 4, image: back, title: 'White Regular Fit T-Shirt', price: 'Rs 1000.00' },
];

const ProductShowcase = () => {
  const { ref: productRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className={classes.productShowcase}>
      <h2 className={classes.headingProduct}>Our products</h2>

      <div className={classes.products} ref={productRef}>
        {products.map((product) => (
          <div className={`${classes.productCard} ${inView ? classes.productCardAnimate : ''}`} key={product.id}>
            <img src={product.image} alt={product.title} />
            <a><p>{product.title}</p></a>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <button className={classes.viewAll}>View All</button>
    </div>
  );
};

export default ProductShowcase;
