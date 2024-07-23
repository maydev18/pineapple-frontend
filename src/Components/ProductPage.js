import React from 'react';
import Card from './Card';
import '../index.css';
import front from '../images/front.jpg';
import hoverImage from '../images/back.jpg'; // Assuming you have a hover image
import Header from './Header';
import Footer from './Footer';

const products = [
  {
    image: front,
    hoverImage: hoverImage,
    title: 'Product 1',
    price: '$10.00',
    description: 'Description for product 1',
  },
  {
    image: front,
    hoverImage: hoverImage,
    title: 'Product 2',
    price: '$20.00',
    description: 'Description for product 2',
  },
  {
    image: front,
    hoverImage: hoverImage,
    title: 'Product 3',
    price: '$30.00',
    description: 'Description for product 3',
  },
  {
    image: front,
    hoverImage: hoverImage,
    title: 'Product 4',
    price: '$40.00',
    description: 'Description for product 4',
  },
  {
    image: front,
    hoverImage: hoverImage,
    title: 'Product 5',
    price: '$50.00',
    description: 'Description for product 5',
  },
];

const ProductPage = () => {
  return (
    <>
      <Header />
      <h1 className='product-heading'>Our Products</h1>
      <div className="product-page">
        {products.map((product, index) => (
          <Card
            key={index}
            image={product.image}
            hoverImage={product.hoverImage}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
      <div className="view-all-container">
        <button className="button">View All</button>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
