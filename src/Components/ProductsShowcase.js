import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import classes from './ProductsShowcase.module.css';
import back from '../images/back.jpg';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import placeholder from '../images/placeholder.png';
import Card from './Card';
import front from '../images/front.jpg';
import banner from '../images/banner.jpg'
import FadeInComponent from './Fade';

const products = [
  {
    image: back,
    hoverImage: front,
    title: 'tecnoteer shorts',
    price: 'Rs10.00',
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
    <><div className={classes.productShowcase}>
      <FadeInComponent>
      <h2 className={classes.headingProduct}>Our products</h2>
      </FadeInComponent>
      <div className={classes.cardContainer} ref={productRef}>
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Link to='/products'>
              <Card
                image={product.image}
                hoverImage={product.hoverImage}
                title={product.title}
                price={product.price}
                description={product.description}
                titleColor="black"
                priceColor="black" />
            </Link>

          </motion.div>

        ))}
      </div>
      <button className="button">View All</button>
    </div>
 
      </>
  );
};

export default ProductShowcase;
