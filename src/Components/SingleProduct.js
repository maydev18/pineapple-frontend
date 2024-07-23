import React from 'react';
import '../index.css';

const SingleProduct = ({ product }) => {
  return (
    <div className="single-product">
      <div className="main-image">
        <img src={product.mainImage} alt={product.name} />
        
      </div>
    </div>
  );
};

export default SingleProduct;
