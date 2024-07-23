// ProductsPage.js
import React from 'react';
import SingleProduct from '../Components/SingleProductCard';
import './ProductsPage.css';

const products = [
  {
    name: 'TECTONEER NAVY REGULAR FIT SHORTS',
    price: 'INR 1599',
    rating: 4,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    mainImage: 'path/to/image1.jpg', // Replace with actual image paths
  },
  {
    name: 'BLACK SLIM FIT PANTS',
    price: 'INR 1999',
    rating: 5,
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    mainImage: 'path/to/image2.jpg', // Replace with actual image paths
  },
  // Add more products as needed
];

const ProductsPage = () => {
  return (
    <div className="products-page">
      {products.map((product, index) => (
        <SingleProduct key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
