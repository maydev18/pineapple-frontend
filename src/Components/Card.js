import React from 'react';
import styles from './Card.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import placeholder from '../images/placeholder.png';
const Card = ({ image, hoverImage, title, price}) => {
  return (
      <div className={styles.card}>
        <div className={styles.cardImageWrapper}>
          <LazyLoadImage
            src={image}
            alt={title}
            className={styles.cardImage}
            placeholderSrc={placeholder}
            effect='blur'
          />
          <LazyLoadImage
            src={hoverImage}
            alt={title}
            className={styles.cardHoverImage}
            placeholderSrc={placeholder}
            effect='blur'
          />
        </div>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardPrice}>{price}</p>
      </div>
  );
};

export default Card;
