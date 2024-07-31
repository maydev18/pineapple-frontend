import React, { useEffect, useState } from 'react';
import SingleProduct from '../Components/SingleProduct';
import CartSidebar from '../Components/CartSidebar';
import WishlistSidebar from '../Components/WishListSidebar';
import { json, useLoaderData, Form } from 'react-router-dom';
import classes from './ProductView.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from 'react-bootstrap';
import { getAuthToken } from '../utils/Auth';
import { useParams } from 'react-router-dom';
import {format} from 'date-fns';
import {Spinner} from 'react-bootstrap';
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const token = getAuthToken();
const isLoggedIn = (token === null || token === 'EXPIRED') ? false : true;

const ProductPage = () => {
  const {productID} = useParams();
  const [reviews, setReviews] = useState([]);
  const [username  , setUserName] = useState('');
  const [stars  , setStars] = useState('');
  const [content  , setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [cartproducts , setCartProducts] = useState([]);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isWishlistSidebarOpen, setIsWishlistSidebarOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);

  const handleAddToCart = async() => {
    setIsSubmitting(true);
    let size;
    if(selectedSize === 'S') size = 'small';
    else if(selectedSize === 'M') size = 'medium';
    else if(selectedSize === 'L') size = 'large';
    else if(selectedSize === 'XL') size = 'extraLarge';
    else if(selectedSize === 'XXL') size = 'doubleExtraLarge';
    const res = await fetch('http://localhost:8080/add-to-cart' , {
      method : "post",
      headers : {
        'Content-Type': 'application/json',
        'Authorization' : 'bearer ' + getAuthToken()
      },
      body : JSON.stringify({
        productID : productID,
        size : size
      })
    });
    if(res.ok){
      getCartItems();
      setIsCartSidebarOpen(true);
    }
    else{
      alert('Failed adding to cart');
    }
    setIsSubmitting(false);
  };
  const getCartItems = async () => {
    const res = await fetch("http://localhost:8080/cart" , {
      headers : {
        'Authorization' : 'bearer ' + token
      }
    });
    if(!res.ok){
      alert('failed to fetch cart items');
    }
    else{
      const cartItems = await res.json();
      setCartProducts(cartItems);
    }
  }
  useEffect(() => {
    getCartItems();
  } , [])
  const handleAddToWishlist = () => {
    setIsWishlistSidebarOpen(true);
  };

  const handleCloseCartSidebar = () => {
    setIsCartSidebarOpen(false);
  };

  const handleCloseWishlistSidebar = () => {
    setIsWishlistSidebarOpen(false);
  };


  const handleReviewSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    const res = await fetch('http://localhost:8080/post-review' , {
      method : 'post',
      headers : {
        'Content-type' : 'application/json',
        'Authorization' : 'bearer ' + getAuthToken()
      },
      body : JSON.stringify({
        stars : stars,
        content : content,
        buyer : username,
        productID : productID
      })
    });
    if(res.ok){
      const savedReview = await res.json();
      setReviews([...reviews , savedReview])
    }
    else{
      alert('failed to post a review');
    }
    setIsSubmitting(false);
    setStars('');
    setContent('');
    setUserName('');
  };

  const sampleProducts = [
    { id: 1, mainImage: 'image1.jpg', selectedSize: 'M', price: '$20', title: 'Product 1', color: 'blue' },
    { id: 2, mainImage: 'image2.jpg', selectedSize: 'L', price: '$30', title: 'Product 2', color: 'yellow'},
  ];

  useEffect(() => {
    const fetchReviews = async() => {
      const res = await fetch('http://localhost:8080/reviews/' + productID);
      const data = await res.json();
      setReviews(data);
    };
    fetchReviews();
  } , [productID])
  

  
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
            <button className={`${classes.productViewButton}`} onClick={handleAddToCart}>{isSubmitting ? <Spinner animation="border" /> : 'Add to Cart'}</button>
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
                  <strong>{rev.buyer}</strong>
                  <div className={classes.reviewRating}>
                    {[...Array(5)].map((star, i) => (
                      <span key={i} className={`${classes.star} ${i < rev.rating ? classes.filled : ''}`}>&#9733;</span>
                    ))}
                  </div>
                  <p>{rev.content}</p>
                  <p>{format(new Date(rev.date) , 'MMMM do, yyyy')}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
        {isLoggedIn && <div className={classes.reviewInput}>
          <h3>Write a Review</h3>
          <form className={classes.reviewForm} onSubmit={handleReviewSubmit}>
            <input type="text" name='userName' required placeholder='Your Full Name' value={username} onChange={(e) => setUserName(e.target.value)}  disabled = {isSubmitting}/>
            <input type="text" name='stars' required placeholder='Your Rating' value={stars} onChange={(e) => setStars(e.target.value)} disabled = {isSubmitting}/>
            <textarea
              placeholder="Write your review here..."
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled = {isSubmitting}/>
            <button type="submit" className={classes.reviewFormbutton} disabled = {isSubmitting}>Submit Review</button>
            {isSubmitting && <Spinner animation="border" />}
          </form>
        </div>
      }
      </div>
      <CartSidebar
        product={product}
        selectedSize={selectedSize}
        isOpen={isCartSidebarOpen}
        onClose={handleCloseCartSidebar}
        cartproducts={cartproducts}
        getCartItems={getCartItems}
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