// Reviews.js
import React, { useState } from 'react';


const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && rating && comment) {
      const newReview = { name, rating: parseInt(rating, 10), comment };
      setReviews([...reviews, newReview]);
      setName('');
      setRating(0);
      setComment('');
    }
  };

  return (
    <div className="reviews">
      <h3>Customer Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <h4>{review.name}</h4>
          <div className="review-rating">
            {[...Array(5)].map((star, starIndex) => (
              <span key={starIndex} className={`star ${starIndex < review.rating ? 'filled' : ''}`}>&#9733;</span>
            ))}
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
      <form className="review-form" onSubmit={handleSubmit}>
        <h4>Write a Review</h4>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
        <textarea
          placeholder="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit" className="submit-review">Submit Review</button>
      </form>
    </div>
  );
};

export default Reviews;
