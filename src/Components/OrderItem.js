import React, { useState } from 'react';
import classes from './OrderItem.module.css';
import OrderDetailsModal from '../Modal/OrderModal';

const OrderItem = ({ image, size, price, title, onCancel }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const orderDetails = { image, size, price, title };

  return (
    <div className={classes.orderItem}>
      <div className={classes.itemDetails}>
        <img src={image} alt="Product" className={classes.orderItemImage} />
        <div className={classes.detailsText}>
          <h2>{title}</h2>
          <h4><span>Price: </span>{price}</h4>
          <h4><span>Size: </span>{size}</h4>
        </div>
        <button className={classes.arrowButton} onClick={handleShow}>&#x2192;</button>
      </div>
      <div className={classes.buttons}>
        <button className={classes.cancelButton} onClick={onCancel}>Return</button>
        <button className={classes.cancelButton} onClick={onCancel}>Cancel</button>
        <button className={classes.cancelButton} onClick={onCancel}>Invoice</button>
      </div>
      <OrderDetailsModal
        show={showModal}
        handleClose={handleClose}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default OrderItem;
