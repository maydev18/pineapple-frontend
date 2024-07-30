import React, { useState } from 'react';
import SingleProduct from '../Components/SingleProduct';
import CartSidebar from '../Components/CartSidebar';
import WishlistSidebar from '../Components/WishListSidebar';
import { json, useLoaderData } from 'react-router-dom';
import classes from './ProductView.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from 'react-bootstrap';
import { color } from 'framer-motion';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

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
  const [isWishlistOpen, setWishlistOpen] = useState(false);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    setIsCartSidebarOpen(true);
    console.log('Adding to cart', product);
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

  const sampleProducts = [
    { id: 1, mainImage: 'image1.jpg', selectedSize: 'M', price: '$20', title: 'Product 1', color: 'blue' },
    { id: 2, mainImage: 'image2.jpg', selectedSize: 'L', price: '$30', title: 'Product 2', color: 'yellow'},
  ];


  
  const data = useLoaderData();
  const product = data.product;
  const images = product.moreImages;

  return (
    <>
      <div className={classes.productsPage}>
        <SingleProduct images={images} mainImage={product.mainImage} backImage={product.backImage} />
        <div className={classes.productDetails}>
          <h2>{product.title}</h2>
          <div className={classes.productRating}>
            {[...Array(5)].map((star, index) => (
              <span key={index} className={`${classes.star} ${index < product.rating ? classes.filled : ''}`}>&#9733;</span>
            ))}
          </div>
          <p className={classes.productPrice}>INR {product.price} (Inc. of all tax)</p>
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
            <button className={`${classes.productViewButton}`} onClick={handleAddToCart}>Add to Cart</button>
            <button className={`${classes.productViewButton}`}  onClick={() => setWishlistOpen(true)}>Wishlist</button>
          </div>
          <Accordion className='mt-4'>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Product Details</Accordion.Header>
              <Accordion.Body>
              <ul>
              <li> Color: {product.color}
             </li>
             <li> Material: Denim
            </li>
            <li> Care Instructions: Machine wash cold</li>
              </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Shipping & Returns</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Free shipping on orders over INR 1000.
                  </li>
                  <li>
                  Easy returns within 30 days of purchase.
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
            <button type="submit" className={classes.reviewFormbutton}>Submit Review</button>
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
        products={sampleProducts}
        isOpen={isWishlistOpen}
        onClose={() => setWishlistOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default ProductPage;

export async function loader({ params }) {
  const id = params.productID;
  const res = await fetch('http://localhost:8080/product/' + id);
  if (!res.ok) {
    throw json({
      message: "could not fetch product details"
    }, {
      status: 500
    });
  }
  else {
    return res;
  }
}
