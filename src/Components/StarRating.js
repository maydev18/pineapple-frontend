import React from 'react';
import classes from './StarRating.module.css'; 
import { Icon } from '@iconify/react';
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
         <Icon icon='material-symbols:star' />
        </span>
      ))}
    </div>
  );
};

export default StarRating;