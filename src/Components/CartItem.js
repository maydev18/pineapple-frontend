import React, { useState } from 'react';
import classes from './CartItem.module.css';

const CartItem = ({ image, size, initialQuantity, price, title }) => {
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className={classes.cartItem}>
      <img src={image} alt="Product" className={classes.cartItemImage} />
      <div className={classes.cartItemDetails}>
        <h2>{title}</h2>
        <h4><span>Size:</span> {size}</h4>
        <h4><span>Price: </span>{price}</h4>
        <div className={classes.quantityBar}>
            <div className={classes.quantity}>
            <button className={classes.quantityButton} onClick={handleDecrease}>-</button>
          <input type="number" className={classes.quantityInput} value={quantity} readOnly />
          <button className={classes.quantityButton} onClick={handleIncrease}>+</button>
            </div>
        
         
        
        </div>
        
      </div>
    </div>
  );
};

export default CartItem;
