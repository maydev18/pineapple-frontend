import React from 'react';
import classes from './StarRating.module.css'; // Create corresponding CSS module

const StarRating = ({ rating, onRatingChange, disabled }) => {
  const handleStarClick = (value) => {
    if (!disabled) {
      onRatingChange(value);
    }
  };

  return (
    <div className={classes.starRating}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`${classes.star} ${index < rating ? classes.filled : ''}`}
          onClick={() => handleStarClick(index + 1)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
