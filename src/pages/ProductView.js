import React, { useContext, useEffect, useState } from 'react';
import SingleProduct from '../Components/SingleProduct';
import CartSidebar from '../Components/CartSidebar';
import { json, useLoaderData } from 'react-router-dom';
import classes from './ProductView.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Spinner, Modal, Button } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import RatingSummary from '@keyvaluesystems/react-star-rating-summary';
import VerifiedIcon from '@mui/icons-material/Verified';
import { green } from '@mui/material/colors';
import { getFullSize } from '../utils/cartUtils/convertSize';
import { CartContext } from '../context/CartContext';
import sizeChart from '../images/size.png'

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const ProductPage = () => {
  const { addToCart, openCart } = useContext(CartContext);
  const { productID } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [ratingValues, setRatingValues] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  const [stock, setStock] = useState({ S: 10, M: 8, L: 15, XL: 5, XXL: 0 }); 

  const [showSizeChart, setshowSizeChart] = useState(false);

  const handleCloseSizeChart = () => setshowSizeChart(false);
  const handleShowSizeChart = () => setshowSizeChart(true);


  const handleAddToCart = async () => {
    setIsSubmitting(true);
    const size = getFullSize(selectedSize);
    await addToCart(productID, size);
    setIsSubmitting(false);
    openCart(true);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch('http://localhost:8080/reviews/' + productID);
      const data = await res.json();
      setReviews(data);
      let stars = [0, 0, 0, 0, 0];
      data.forEach(review => {
        stars[review.stars - 1]++;
      });
      setRatingValues({
        1: stars[0],
        2: stars[1],
        3: stars[2],
        4: stars[3],
        5: stars[4]
      });
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
          {/* <div className={classes.productRating}>
            {[...Array(5)].map((star, index) => (
              <span key={index} className={`${classes.star} ${index < product.rating ? classes.filled : ''}`}>&#9733;</span>
            ))}
          </div> */}
          <p className={classes.productPrice}>INR {product.price} (Inc. of all tax)</p>
          <p className={classes.productDescription}>{product.description}</p>
          <div className={classes.productSizes}>
            <p>SELECT A SIZE</p>
            <div className={classes.sizes}>
              {sizes.map((size) => (
                <><div key={size} className={classes.sizeWrapper}>
                  <button
                    className={`${classes.sizeButton} ${size === selectedSize ? classes.selected : ''}`}
                    onClick={() => setSelectedSize(size)}
                    disabled={stock[size] === 0}
                  >
                    {size}
                  </button>
                  <p className={classes.stockInfo} style={{ color: "RED", fontSize: '13px', fontWeight: "300" }}>
                    {stock[size]} left </p>
                   
                   
                </div></>
              ))}
             
            </div>
            <button className={classes.sizeChartButton} onClick={handleShowSizeChart}> <Icon icon="hugeicons:tape-measure"  style={{color: "black", paddingRight: '6px', fontSize: '26px'}} />size chart</button>
            <Modal show={showSizeChart} onHide={handleCloseSizeChart}>
              <p style={{textAlign: "right", color: "black", padding: '12px', cursor: "pointer"}} onClick={handleCloseSizeChart}>X</p>
              <img  src={sizeChart} alt='sizechart'/>
      </Modal>
          </div>
          <button className={classes.productViewButton} onClick={handleAddToCart}>
          <Icon icon="bi:cart3" style={{color: "white", paddingRight: '6px', paddingBottom: '6px', fontSize: '29px'}} /> Add to Cart
            </button>
          
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
        <div className={classes.ReviewBar}>
          <div>
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
                    {[...Array(rev.stars)].map((star, i) => (
                      <Icon key={i} icon='material-symbols:star' style={{ color: 'black' }} />
                    ))}
                    {[...Array(5 - rev.stars)].map((star, i) => (
                      <Icon key={i} icon="material-symbols:star-outline" />
                    ))}
                  </div>
                  <p>{rev.content}</p>
                  <p>{format(new Date(rev.date), 'MMMM do, yyyy')}</p>
                </li>
              ))}
            </ul>
            {reviews.length > 2 && (
              <button className={classes.reviewFormbutton} onClick={() => setShowAllReviews(!showAllReviews)}>
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
