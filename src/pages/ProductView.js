import React, { useContext, useEffect, useState } from 'react';
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
import VerifiedIcon from '@mui/icons-material/Verified';
import { green } from '@mui/material/colors';
import { getFullSize } from '../utils/cartUtils/convertSize';
import { CartContext } from '../context/CartContext';
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const ProductPage = () => {
  const {addToCart , openCart} = useContext(CartContext);
  const { productID } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [showAllReviews, setShowAllReviews] = useState(false); // Manage number of reviews displayed
  const [ratingValues , setRatingValues] = useState({5: 0,4: 0,3: 0,2: 0,1: 0});

  const handleAddToCart = async () => {
    setIsSubmitting(true);
    const size = getFullSize(selectedSize);
    await addToCart(productID , size);
    setIsSubmitting(false);
    openCart(true);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch('http://localhost:8080/reviews/' + productID);
      const data = await res.json();
      setReviews(data);
      let stars = [0,0,0,0,0];
      data.forEach(review => {
        stars[review.stars-1]++;
      })
      ratingValues[1] = stars[0];
      ratingValues[2] = stars[1];
      ratingValues[3] = stars[2];
      ratingValues[4] = stars[3];
      ratingValues[5] = stars[4];
      setRatingValues(ratingValues);
    };
    fetchReviews();
  }, [productID]);

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
            <button className={`${classes.productViewButton}`} onClick={handleAddToCart}>
              {isSubmitting ? <Spinner animation="border" /> : 'Add to Cart'}
            </button>
          </div>
          <Accordion className="mt-4">
    <Accordion.Item eventKey="0" className={classes.accordionItem}>
      <Accordion.Header className={classes.accordionHeader}>Fit & Size</Accordion.Header>
      <Accordion.Body className={classes.accordionBody}>
        <ul>
          <li>Fit: {product.fit}</li>
          <li>Size: {product.size}</li>
        </ul>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1" className={classes.accordionItem}>
      <Accordion.Header className={classes.accordionHeader}>Care Instructions</Accordion.Header>
      <Accordion.Body className={classes.accordionBody}>
        <ul>
          <li>{product.washCare}</li>
        </ul>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="2" className={classes.accordionItem}>
      <Accordion.Header className={classes.accordionHeader}>Specifications</Accordion.Header>
      <Accordion.Body className={classes.accordionBody}>
        <ul>
          <li>{product.specifications}</li>
        </ul>
      </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="3" className={classes.accordionItem}>
      <Accordion.Header className={classes.accordionHeader}>Shipping & Returns</Accordion.Header>
      <Accordion.Body className={classes.accordionBody}>
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
        <div className={classes.ReviewBar}>  <div >
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
      classes={{
       
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
           <div className={classes.customerReviewscard}>
             
              <ul className={classes.reviewList}>
                {reviews.slice(0, showAllReviews ? reviews.length : 2).map((rev, index) => (
                  <li key={index} className={classes.reviewItem}>
                    <div className={classes.alignCard}>
                    <strong>{rev.buyer}</strong>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <VerifiedIcon style={{ color: green[500] }} />
                        <span style={{ marginLeft: '8px' }}>Verified Buyer</span>
                      </div>
                    </div>
                    <div>
                      {
                        [...Array(rev.stars)].map((star , i) => (
                          <Icon icon='material-symbols:star' style={{color : 'black'}} />
                        ))
                      }
                      {
                        [...Array(5-(rev.stars))].map((star , i) => (
                          <Icon icon="material-symbols:star-outline" />
                        ))
                      }
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
            
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}   
      </div>
      <CartSidebar />
    </>
  );
};

export default ProductPage;

export async function loader({ params }) {
  const id = params.productID;
  const res = await fetch(process.env.REACT_APP_BASE_URL + 'product/' + id);
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
