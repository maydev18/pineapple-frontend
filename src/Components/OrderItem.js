import React, { useState } from 'react';
import classes from './OrderItem.module.css';
import OrderDetailsModal from '../Modal/OrderModal';
import ExchangeModal from '../Modal/ExchangeModal'; 

const OrderItem = ({ onCancel, orderID, paymentID, products, address, time, completed }) => {
  const [showModal, setShowModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleShowExchange = () => setShowExchangeModal(true);
  const handleCloseExchange = () => setShowExchangeModal(false);

  const totalPrice = () => {
    let total = 0;
    products.forEach(pro => {
      total += pro.quantity * pro.price;
    });
    return total;
  };

  return (
    <div className={classes.orderItem}>
      <div className={classes.itemDetails}>
        <div className={classes.detailsText}>
          <button className={classes.arrowButton} onClick={handleShow}>
            Order Summary<span className={classes.arrow}></span>
          </button>
          <p><span>Order Date: </span>{time}</p>
          <p><span>Total Amount: ₹</span>{totalPrice()}</p>
        </div>
      </div>

      <div className={classes.buttons}>
        <button className={classes.cancelButton} onClick={handleShowExchange}>Exchange</button>
        <button className={classes.cancelButton} onClick={onCancel}>Invoice</button>
      </div>

      
      <OrderDetailsModal
        show={showModal}
        handleClose={handleClose}
        products={products}
        orderID={orderID}
        paymentID={paymentID}
        completed={completed}
        address={address}
      />

      
      <ExchangeModal
        show={showExchangeModal}
        handleClose={handleCloseExchange}
        products={products}
        orderID={orderID}
      />
    </div>
  );
};

export default OrderItem;
