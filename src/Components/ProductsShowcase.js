import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../index.css';
import back from '../images/back.jpg';

const products = [
  { id: 1, image: back, title: 'White Regular Fit T-Shirt', price: 'Rs 1000.00' },
  { id: 2, image: back, title: 'White Regular Fit T-Shirt', price: 'Rs 1000.00' },
  { id: 3, image: back, title: 'White Regular Fit T-Shirt', price: 'Rs 1000.00' },
  { id: 4, image: back, title: 'White Regular Fit T-Shirt', price: 'Rs 1000.00' },
];

const ProductShowcase = () => {
  const { ref: productRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="product-showcase">
      <h2 className='heading-product'>Our products</h2>

      <div className="products" ref={productRef}>
        {products.map((product) => (
          <div className={`product-card ${inView ? 'animate' : ''}`} key={product.id}>
            <img src={product.image} alt={product.title} />
            <a><p>{product.title}</p></a>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <button className="view-all">View All</button>
    </div>
  );
};

export default ProductShowcase;
