import React, { useState } from 'react';
import classes from './OrderItem.module.css';
import OrderDetailsModal from '../Modal/OrderModal';
import ExchangeModal from '../Modal/ExchangeModal'; // Assuming you will create this modal
const OrderItem = ({order}) => {
  const [showModal, setShowModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleShowExchange = () => setShowExchangeModal(true);
  const handleCloseExchange = () => setShowExchangeModal(false);
  const canExchange = () => {
    const daysFromDelivery = (Date.now() - new Date(order.deliveryDate ? order.deliveryDate : 0)) / (1000 * 60 * 60 * 24);
    if(!order.completed || daysFromDelivery >= 4 || order.exchanged) return false;
    return true;
  }
  const getExchangeDate = () => {
    const exchangeDate = new Date(order.deliveryDate);
    exchangeDate.setDate(exchangeDate.getDate() + 4);
    return exchangeDate.toLocaleDateString('en-GB');
  }
  return (
    <div className={classes.orderItem}>
      <div className={classes.itemDetails}>
        <div className={classes.detailsText}>
          <button className={classes.arrowButton} onClick={handleShow}>
            Order Summary<span className={classes.arrow}></span>
          </button>
          <p><span>Order ID: </span>{order.orderID}</p>
          <p><span>Order Date: </span>{new Date(order.time).toLocaleDateString('en-GB')}</p>
          {
            order.deliveryDate && <p><span>Delivery Date: </span>{new Date(order.deliveryDate).toLocaleDateString('en-GB')}</p>
          }
          <p><span>Total Amount: ₹</span>{order.total}</p>
          <p style={{textTransform : 'capitalize'}}><span>Shipping Address: </span>{`${order.address.fullName}, ${order.address.firstLine}, ${order.address.secondLine}, ${order.address.city}, ${order.address.state}, ${order.address.landmark}`}</p>
          <p><span>Phone : </span>{order.address.phone}</p>
          <p><span>Email : </span>{order.address.email}</p>  
          {
            order.exchanged && <p>Exchange request raised</p>
          }    
        </div>
      </div>

      <div className={classes.buttons}>
        {canExchange() && 
          <div>
            <button  className={classes.cancelButton} onClick={handleShowExchange}>Exchange</button>
            <p>Exchange applicable till {getExchangeDate()}</p>
          </div>
        }
      </div>

      
      <OrderDetailsModal
        show={showModal}
        handleClose={handleClose}
        order={order}
      />

      {/* Exchange Modal */}
      {canExchange() && 
        <ExchangeModal
          show={showExchangeModal}
          handleClose={handleCloseExchange}
          products={order.products}
          orderID={order.orderID}
        />
      }
      
    </div>
  );
};

export default OrderItem;
