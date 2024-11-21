import React from 'react';
import styles from './Card.module.css';

const Card = ({ image, hoverImage, title, price, titleColor, priceColor, allSizesOutOfStock }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <img src={image} alt={title} className={styles.cardImage} />
        <img src={hoverImage} alt={title} className={styles.cardHoverImage} />
        {allSizesOutOfStock && (
          <div className={styles.soldOutOverlay}>
            <span className={styles.soldOutLabel}>
              <p>Sold Out</p>
            </span>
          </div>
        )}
      </div>
      <h2
        className={styles.cardTitle}
        style={{ color: titleColor }}
        title={title} // Tooltip to show full title on hover
      >
        {title}
      </h2>
      <p className={styles.cardPrice} style={{ color: priceColor }}>
        <span>₹ 899</span> INR {price}
      </p>
    </div>
  );
};

export default Card;
