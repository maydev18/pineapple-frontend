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
import { format } from 'date-fns';
import { Spinner } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import RatingSummary from '@keyvaluesystems/react-star-rating-summary';
import { color } from 'framer-motion';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const token = getAuthToken();
const isLoggedIn = token === null || token === 'EXPIRED' ? false : true;

const ProductPage = () => {
  const { productID } = useParams();
  const [reviews, setReviews] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [cartproducts, setCartProducts] = useState([]);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isWishlistSidebarOpen, setIsWishlistSidebarOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);
  const [addresses, setAddresses] = useState([]); // Manage addresses
  const [showAllReviews, setShowAllReviews] = useState(false); // Manage number of reviews displayed

  const handleAddToCart = async () => {
    setIsSubmitting(true);
    let size;
    if (selectedSize === 'S') size = 'small';
    else if (selectedSize === 'M') size = 'medium';
    else if (selectedSize === 'L') size = 'large';
    else if (selectedSize === 'XL') size = 'extraLarge';
    else if (selectedSize === 'XXL') size = 'doubleExtraLarge';
    const res = await fetch('http://localhost:8080/add-to-cart', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + getAuthToken(),
      },
      body: JSON.stringify({
        productID: productID,
        size: size,
      }),
    });
    if (res.ok) {
      getCartItems();
      setIsCartSidebarOpen(true);
    } else {
      alert('Failed adding to cart');
    }
    setIsSubmitting(false);
  };

  const getCartItems = async () => {
    const res = await fetch('http://localhost:8080/cart', {
      headers: {
        Authorization: 'bearer ' + token,
      },
    });
    if (!res.ok) {
      alert('failed to fetch cart items');
    } else {
      const cartItems = await res.json();
      setCartProducts(cartItems);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleAddToWishlist = () => {
    setIsWishlistSidebarOpen(true);
  };

  const handleCloseCartSidebar = () => {
    setIsCartSidebarOpen(false);
  };

  const handleCloseWishlistSidebar = () => {
    setIsWishlistSidebarOpen(false);
  };

 
  const handleEditClick = (address) => {
   
  };

  const handleDeleteAddress = async (addressID) => {
  
  };

  const sampleProducts = [
    { id: 1, mainImage: 'image1.jpg', selectedSize: 'M', price: '$20', title: 'Product 1', color: 'blue' },
    { id: 2, mainImage: 'image2.jpg', selectedSize: 'L', price: '$30', title: 'Product 2', color: 'yellow' },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch('http://localhost:8080/reviews/' + productID);
      const data = await res.json();
      setReviews(data);
    };
    fetchReviews();
  }, [productID]);

  const data = useLoaderData();
  const product = data.product;
  const images = product.moreImages;

  const ratingValues = {
    5: 100,
    4: 200,
    3: 300,
    2: 1000,
    1: 400
  };


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
            <button className={`${classes.productViewButton}`} onClick={handleAddToCart}>
              {isSubmitting ? <Spinner animation="border" /> : 'Add to Cart'}
            </button>
            <button className={`${classes.productViewButton}`} onClick={() => setWishlistOpen(true)}>Wishlist</button>
          </div>
          <Accordion className="mt-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Product Details</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Color: {product.color}</li>
                  <li>Material: Denim</li>
                  <li>Care Instructions: Machine wash cold</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Shipping & Returns</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Free shipping on orders over INR 1000.</li>
                  <li>Easy returns within 30 days of purchase.</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <div className={classes.reviewSection}>
        <h3>Customer Reviews</h3>
        <div className={classes.ReviewBar}>
    

      
           
          <div >
        
          <RatingSummary
      ratings={ratingValues}
      barColors={{
        5: '#0a1f1c',
        4: '#0a1f1c',
        3: '#0a1f1c',
        2: '#0a1f1c',
        1: '#0a1f1c'
      }}
      ratingAverageIconProps={{
        fillColor: '#0a1f1c',
        bgColor: '#0a1f1c'
      }}
      styles={{
       
        Average: { color: '#0a1f1c' },
        AverageStarIcon: {
          width: '20px',
          height: '20px',
        
        },
        
        LabelStarIcon: () => ({
          width: '15px',
          height: '15px',
          color: '#0a1f1c' 
          
          
          
        }),
        Label: (ratingId) => ({ fontSize: '12px' }),
        
      }}
    />
          </div>
        </div>  
      </div>
      <div className={classes.CustomerReviews}>
      {reviews.length > 0 ? (
            <>
              <ul className={classes.reviewList}>
                {reviews.slice(0, showAllReviews ? reviews.length : 2).map((rev, index) => (
                  <li key={index} className={classes.reviewItem}>
                    <strong>{rev.buyer}</strong>
                    <div className={classes.addressActions}>
                      <Icon icon="mdi:pencil" className={classes.editIcon} onClick={() => handleEditClick(rev.address)} fontSize={"20px"} />
                      <Icon icon="mdi:trash" className={classes.deleteIcon} onClick={() => handleDeleteAddress(rev.addressID)} fontSize={"20px"} />
                    </div>
                    <div className={classes.reviewRating}>
                      {[...Array(5)].map((star, i) => (
                        <span key={i} className={`${classes.star} ${i < rev.rating ? classes.filled : ''}`}>&#9733;</span>
                      ))}
                    </div>
                    
                    <p>{rev.content}</p>
                    <p>{format(new Date(rev.date), 'MMMM do, yyyy')}</p>
                   
                  </li>
                ))}
              </ul>
              {reviews.length > 2 && (
                <button className={`${classes.reviewFormbutton} button`} onClick={() => setShowAllReviews(!showAllReviews)}>
                  {showAllReviews ? 'Show Less' : 'View All'}
                </button>
              )}
            </>
          ) : (
            <p>No reviews yet.</p>
          )}
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
    throw json(
      {
        message: 'could not fetch product details',
      },
      {
        status: 500,
      }
    );
  } else {
    return res;
  }
}
