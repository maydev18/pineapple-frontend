import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import classes from './ReviewPage.module.css';
import { format } from 'date-fns';

const ReviewPage = () => {
  const { productID } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch('http://localhost:8080/reviews/' + productID);
      const data = await res.json();
      setReviews(data);
    };
    fetchReviews();
  }, [productID]);

  return (
    <div className={classes.reviewPage}>
      <h2>All Reviews</h2>
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
              <p>{format(new Date(rev.date), 'MMMM do, yyyy')}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
      <Link to={`/product/${productID}`} className={`${classes.backButton} button`}>Back to Product</Link>
    </div>
  );
};

export default ReviewPage;
