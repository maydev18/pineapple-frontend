import React, { useState } from 'react';
import SingleProduct from '../Components/SingleProduct';
import Footer from './Footer';
import Header from '../Components/Header';
import back from '../images/back.jpg';
import front from '../images/front.jpg';
import CartSidebar from '../Components/CartSidebar';
import { Icon } from '@iconify/react';
import arrowLeftCircle from '@iconify-icons/mdi/arrow-left-circle';
import arrowRightCircle from '@iconify-icons/mdi/arrow-right-circle';

const product = {
  name: 'TECTONEER NAVY REGULAR FIT SHORTS',
  price: 'INR 1599',
  rating: 4,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  mainImage: back,
  images: [back, front, front, front],
};

const sizes = ['S', 'M', 'L', 'XL'];

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [review, setReview] = useState('');
  
  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Handle review submission here
    setReview('');
  };

  return (
    <>
      <Header />
      <div className="products-page">
        <SingleProduct product={product} />
        <div className="product-details">
          <h2>{product.name}</h2>
          <p className="product-price">{product.price}</p>
          <div className="product-rating">
            {[...Array(5)].map((star, index) => (
              <span key={index} className={`star ${index < product.rating ? 'filled' : ''}`}>&#9733;</span>
            ))}
          </div>
          <p className="product-description">{product.description}</p>
          <div className="product-sizes">
            <p>Select Size:</p>
            <div className="sizes">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${size === selectedSize ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="product-quantity">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>
          <div className="product-buttons">
            <button className="button add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
            <button className="button add-to-wishlist">Wishlist</button>
          </div>
        </div>
      </div>
      <div className="review-section">
        <h3>Write a Review</h3>
        <form onSubmit={handleReviewSubmit} className="review-form">
          <textarea
            value={review}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
            required
          />
          <button type="submit" className="button submit-review">Submit Review</button>
        </form>
      </div>
      <CartSidebar
        product={product}
        quantity={quantity}
        selectedSize={selectedSize}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
      <Footer />
    </>
  );
};

export default ProductPage;
