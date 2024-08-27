import React, { useState } from 'react';
import classes from './OrderItem.module.css';
import OrderDetailsModal from '../Modal/OrderModal';

const OrderItem = ({onCancel , orderID , paymentID , products , address , time , completed}) => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const totalPrice = () => {
    let total = 0;
    products.forEach(pro => {
      total += pro.quantity * pro.price;
    });
    return total;
  }
  return (
    <div className={classes.orderItem }>
      <div className={classes.itemDetails}>
        <div className={classes.detailsText}>
          
          {/* <h2>{orderID}</h2> */}
          <button class={classes.arrowButton} onClick={handleShow}>Order Summary<span class={classes.arrow}></span>
</button>
          
          <p><span>Order Date: </span>{time}</p>
          <p><span>Total Amount: ₹</span>{totalPrice()}</p>
          {/* <h4><span>Payment ID: </span>{paymentID}</h4> */}
        </div>
      
      </div>
      <div className={classes.buttons}>
        <button className={classes.cancelButton} onClick={onCancel}>Return</button>
        <button className={classes.cancelButton} onClick={onCancel}>Cancel</button>
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
  
    </div>
  );
};

export default OrderItem;
