import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import classes from './ProductsShowcase.module.css';
import { Link , useLoaderData } from 'react-router-dom';
import Card from './Card';
import FadeInComponent from './Fade';

const ProductShowcase = () => {
  const { ref: productRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const data = useLoaderData();
  const products = data.products;
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
                image={product.mainImage}
                hoverImage={product.backImage}
                title={product.title}
                price={product.price}
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
