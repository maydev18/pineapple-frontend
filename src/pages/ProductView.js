import React, { useState } from 'react';
import SingleProduct from '../Components/SingleProduct';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import CartSidebar from '../Components/CartSidebar';
import WishlistSidebar from '../Components/WishListSidebar';
import classes from './ProductView.module.css';
import backImage from '../images/back.jpg';
import frontImage from '../images/front.jpg';

const product = {
  id: "669cc48798f9104fa632e2ac",
  title: "Slick Light Blue Distressed Slim Fit Jeans",
  description: "Lorem ipsum dolor sit amet, consectet ad minim veniam, re dolor in reprehenderit. Excepteur sint occaecat cupidatat non proident anim id est laborum",
  price: "INR 5000",
  mainImage: backImage,
  moreImages: [backImage, frontImage],
  color: "Blue",
  rating: 4
};

const sizes = ['S', 'M', 'L', 'XL'];

const dummyReviews = [
  { username: 'John Doe', rating: 4, text: 'Great shorts! Very comfortable and stylish.' },
  { username: 'Jane Smith', rating: 5, text: 'Absolutely love these shorts! Perfect fit and quality.' },
  { username: 'Alice Johnson', rating: 3, text: 'Good shorts, but the color fades after a few washes.' }
];

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isWishlistSidebarOpen, setIsWishlistSidebarOpen] = useState(false);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState(dummyReviews);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    setIsCartSidebarOpen(true);
  };

  const handleAddToWishlist = () => {
    setIsWishlistSidebarOpen(true);
  };

  const handleCloseCartSidebar = () => {
    setIsCartSidebarOpen(false);
  };

  const handleCloseWishlistSidebar = () => {
    setIsWishlistSidebarOpen(false);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      username: 'Anonymous',
      rating: 4,
      text: review
    };
    setReviews([...reviews, newReview]);
    setReview('');
  };

  return (
    <>
      <Header onOpenCart={handleAddToCart} onOpenWishlist={handleAddToWishlist} />
      <div className={classes.productsPage}>
        <SingleProduct product={product} />
        <div className={classes.productDetails}>
          <h2>{product.title}</h2>
          <p className={classes.productDescription}>{product.description}</p>
          <p className={classes.productPrice}>{product.price}</p>
          <div className={classes.productRating}>
            {[...Array(5)].map((star, index) => (
              <span key={index} className={`${classes.star} ${index < product.rating ? classes.filled : ''}`}>&#9733;</span>
            ))}
          </div>
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
            <button className={`${classes.productViewButton} button`} onClick={handleAddToWishlist}>Wishlist</button>
          </div>
        </div>
      </div>
      <div className={classes.reviewSection}>
        <div>
          <h3>Customer Reviews</h3>
          {reviews.length > 0 ? (
            <ul className={classes.reviewList}>
              {reviews.map((rev, index) => (
                <li key={index} className={classes.reviewItem}>
                  <strong>{rev.username}</strong>
                  <div className={classes.reviewRating}>
                    {[...Array(5)].map((star, i) => (
                      <span key={i} className={`${classes.star} ${i < rev.rating ? classes.filled : ''}`}>&#9733;</span>
                    ))}
                  </div>
                  <p>{rev.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
        <div className={classes.reviewInput}>
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
      </div>
      <CartSidebar
        product={product}
        initialQuantity={quantity}
        selectedSize={selectedSize}
        isOpen={isCartSidebarOpen}
        onClose={handleCloseCartSidebar}
      />
      <WishlistSidebar
        product={product}
        initialQuantity={quantity}
        selectedSize={selectedSize}
        isOpen={isWishlistSidebarOpen}
        onClose={handleCloseWishlistSidebar}
      />
      <Footer />
    </>
  );
};

export default ProductPage;
