import React, { useState } from 'react';
import classes from './OrderItem.module.css';
import OrderDetailsModal from '../Modal/OrderModal';
import { Icon } from '@iconify/react';

const OrderItem = ({onCancel , orderID , paymentID , products , address , time , completed, image}) => {
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
          
          <h2>{orderID}</h2>
          <p><span>Order Date: </span>{time}</p>
          <p><span>Total Amount: ₹</span>{totalPrice()}</p>
          {/* <h4><span>Payment ID: </span>{paymentID}</h4> */}
        </div>
        <button className={classes.arrowButton} onClick={handleShow}><Icon icon="weui:arrow-outlined" fontSize={'30px'} style={{color: "black"} } /></button>
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
