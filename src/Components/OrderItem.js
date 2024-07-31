import React from 'react';
import classes from './OrderItem.module.css';

const OrderItem = ({ image, size, price, title, onCancel , orderID , paymentID , quantity }) => {
  return (
    <div className={classes.orderItem}>
      <div className={classes.itemDetails}>
        <img src={image} alt="Product" className={classes.orderItemImage} />
        <div className={classes.detailsText}>
          <h2>{orderID}</h2>
          <h4><span>Price: </span>{price}</h4>
          <h4><span>Size: </span>{size}</h4>
          <h4><span>Quantity: </span>{quantity}</h4>
          <h4><span>Payment ID: </span>{paymentID}</h4>
        </div>
        <button className={classes.arrowButton}>&#x2192;</button>
      </div>
      <div className={classes.buttons}>
      <button className={classes.cancelButton} onClick={onCancel}>
        Return
      </button>
      <button className={classes.cancelButton} onClick={onCancel}>
        Cancel
      </button>
      </div>
    </div>
  );
};

export default OrderItem;
