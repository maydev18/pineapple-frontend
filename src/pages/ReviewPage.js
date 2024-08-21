
import React, { useEffect, useState } from 'react';
import classes from './ProductView.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuthToken } from '../utils/Auth';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import StarRating from '../Components/StarRating'


const token = getAuthToken();
const isLoggedIn = token === null || token === 'EXPIRED' ? false : true;


function ReviewPage({reviews , setReviews}) {
    const { productID } = useParams();
    const [username, setUserName] = useState('');
    const [stars, setStars] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleReviewSubmit = async (event) => {
        setIsSubmitting(true);
        event.preventDefault();
        const res = await fetch('http://localhost:8080/post-review', {
          method: 'post',
          headers: {
            'Content-type': 'application/json',
            Authorization: 'bearer ' + getAuthToken(),
          },
          body: JSON.stringify({
            stars: stars,
            content: content,
            buyer: username,
            productID: productID,
          }),
        });
        if (res.ok) {
          const savedReview = await res.json();
          console.log(reviews);
          setReviews([...reviews, savedReview]);
        } else {
          alert('failed to post a review');
        }
        setIsSubmitting(false);
        setStars('');
        setContent('');
        setUserName('');
      };
    
  return (
    <div style={{marginTop: '2rem'}}>
    {isLoggedIn && (
          <div className={classes.reviewInput}>
            <h4>Write a Review</h4>
            <form className={classes.reviewForm} onSubmit={handleReviewSubmit}>
            <div>
                
               <StarRating rating={stars} onRatingChange={setStars} disabled={isSubmitting} /> 
              </div>
              
              <input
                type="text"
                name="userName"
                required
                placeholder="Your Full Name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                disabled={isSubmitting}
              />
              
              <textarea
                placeholder="Write your review here..."
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
              />
              <button type="submit" className={`${classes.reviewFormbutton}`} disabled={isSubmitting}>
                Submit Review
              </button>
              {isSubmitting && <Spinner animation="border" />}
            </form>
          </div>
        )}
    </div>
  )
}

export default ReviewPage
