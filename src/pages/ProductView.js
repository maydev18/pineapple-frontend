import React, { useState } from 'react';
import SingleProduct from '../Components/SingleProduct';
import CartSidebar from '../Components/CartSidebar';
import WishlistSidebar from '../Components/WishListSidebar';
import classes from './ProductView.module.css';
import { Form, json , useLoaderData , useNavigation} from 'react-router-dom';
import { getAuthToken } from '../utils/Auth';

const sizes = ['S', 'M', 'L', 'XL' , 'XXL'];

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

  const handleReviewSubmit = (newReview) => {

    setReviews([...reviews, newReview]);
    setReview('');
  };
  const data = useLoaderData();
  const product = data.product
  const images = product.moreImages;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <>
      <div className={classes.productsPage}>
        <SingleProduct images={images} mainImage = {product.mainImage} backImage = {product.backImage} />
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
                  disabled= {isSubmitting ? true : false}
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
          <Form className={classes.reviewForm} method='POST'>
            <input type="text" name='userName' required placeholder='Your Full Name'/>
            <input type="text" name='stars' required placeholder='Your Rating'/>
            <textarea
              value={review}
              onChange={handleReviewChange}
              placeholder="Write your review here..."
              required
              name='content'
            />
            <button type="submit" className="button">Submit Review</button>
          </Form>
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
    </>
  );
};

export default ProductPage;

export async function loader({params}){
  const id = params.productID;
  const res = await fetch('http://localhost:8080/product/' + id);
  if(!res.ok){
      throw json({
          message : "could not fetch event details"
      } , {
          status : 500
      })
  }
  else{
      return res;
  }
}

export async function action({request , params}){
  try{
    const id = params.productID;
    const data = await request.formData();
    const reviewData = {
      productID : id,
      stars : data.get('stars'),
      content : data.get('content'),
      buyer : data.get('userName')
    }
    const res = fetch('http://localhost:8080/post-review' , {
      method : 'POST',
        headers : {
            'content-type' : "application/json",
            'authorization' : 'bearer ' + getAuthToken()
        },
        body : JSON.stringify(reviewData)
    });
    return res;
  }
  catch(err){
    alert('could not post review');
    return null;
  }
}