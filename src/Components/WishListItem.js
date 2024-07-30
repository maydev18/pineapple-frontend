import React from 'react';
import classes from './WishListItem.module.css';

const WishlistItem = ({ image, size, price, color, title, onAddToCart }) => {
  return (
    <div className={classes.wishlistItem}>
      <img src={image} alt="Product" className={classes.wishlistItemImage} />
      <div className={classes.wishlistItemDetails}>
        <h2>{title}</h2>
        <h4><span>Size:</span> {size}</h4>
        <h4><span>Price: </span>{price}</h4>
        <h4><span>Color: </span>{color}</h4>
        <button className={classes.addToCartButton} onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
