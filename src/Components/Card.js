import React from 'react';
import styles from './Card.module.css';

const Card = ({ image, hoverImage, title, price, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <img src={image} alt={title} className={styles.cardImage} />
        <img src={hoverImage} alt={title} className={styles.cardHoverImage} />
      </div>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardPrice}>{price}</p>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
};

export default Card;
