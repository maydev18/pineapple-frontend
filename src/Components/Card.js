import React from 'react';
import styles from './Card.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import placeholder from '../images/placeholder.png';

const Card = ({ image, hoverImage, title, price, titleColor, priceColor, allSizesOutOfStock }) => {

 
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
        {allSizesOutOfStock && (
          <div className={styles.soldOutOverlay}>
            <span className={styles.soldOutLabel}>
              <p>Sold Out</p>
            </span>
          </div>
        )}
      </div>
      <h2 className={styles.cardTitle} style={{ color: titleColor, textAlign: 'center', fontWeight: 400 }}>{title}</h2>
      <p className={styles.cardPrice} style={{ color: priceColor }}>  <span>₹ {2 * price}</span>  INR {price}</p>
    </div>
  );
};

export default Card;
