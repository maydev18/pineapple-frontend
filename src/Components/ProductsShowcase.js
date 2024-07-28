import React from 'react';
import { useInView } from 'react-intersection-observer';
import classes from './ProductsShowcase.module.css';
import back from '../images/back.jpg';
import front from '../images/front.jpg';
import {Link} from 'react-router-dom';
import Card from './Card'

const products = [
  {
    image: back,
    hoverImage: front,
    title: 'Product 1',
    price: '$10.00',
    description: 'Description for product 1',
  },
  {
    image: back,
    hoverImage: front,
    title: 'Product 2',
    price: '$20.00',
    description: 'Description for product 2',
  },
  {
    image: back,
    hoverImage: front,
    title: 'Product 3',
    price: '$30.00',
    description: 'Description for product 3',
  },
  {
    image: back,
    hoverImage: front,
    title: 'Product 3',
    price: '$30.00',
    description: 'Description for product 3',
  },
  
];

const ProductShowcase = () => {
  const { ref: productRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className={classes.productShowcase}>
      <h2 className={classes.headingProduct}>Our products</h2>

      <div className={classes.cardContainer}>
          {products.map((product, index) => (
           <Link to='/productsView'> <Card
              key={index}
              image={product.image}
              hoverImage={product.hoverImage}
              title={product.title}
              price={product.price}
              description={product.description}
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
