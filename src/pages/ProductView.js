import React, { useState } from 'react';
import SingleProduct from '../Components/SingleProduct';
import back from '../images/back.jpg';
import front from '../images/front.jpg';
import CartSidebar from '../Components/CartSidebar';
import classes from './ProductView.module.css';

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
    setReview('');
  };

  return (
    <>
      <div className={classes.productsPage}>
        <SingleProduct product={product} />
        <div className={classes.productDetails}>
          <h2>{product.name}</h2>
          <p className={classes.productPrice}>{product.price}</p>
          <div className={classes.productRating}>
            {[...Array(5)].map((star, index) => (
              <span key={index} className={`${classes.star} ${index < product.rating ? classes.filled : ''}`}>&#9733;</span>
            ))}
          </div>
          <p className={classes.productDescription}>{product.description}</p>
          <div className={classes.productSizes}>
            <p>Select Size:</p>
            <div className={classes.sizes}>
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`${classes.sizeButton} ${size === selectedSize ? classes.selected : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className={classes.productButtons}>
            <button className={`${classes.productViewButton} button`} onClick={handleAddToCart}>Add to Cart</button>
            <button className={`${classes.productViewButton} button`}>Wishlist</button>
          </div>
        </div>
      </div>
      <div className={classes.reviewSection}>
        <h3>Write a Review</h3>
        <form onSubmit={handleReviewSubmit} className={classes.reviewForm}>
          <textarea
            value={review}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
            required
          />
          <button type="submit" className="button">Submit Review</button>
        </form>
      </div>
      <CartSidebar
        product={product}
        quantity={quantity}
        selectedSize={selectedSize}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </>
  );
};

export default ProductPage;
