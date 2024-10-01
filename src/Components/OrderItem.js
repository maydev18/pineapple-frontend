import React, { useState } from 'react';
import classes from './OrderItem.module.css';
import OrderDetailsModal from '../Modal/OrderModal';
import ExchangeModal from '../Modal/ExchangeModal'; // Assuming you will create this modal
import { useAuth } from '../context/AuthContext';
import { useError } from '../context/ErrorContext';
import { useNavigate } from 'react-router-dom';
const OrderItem = ({order}) => {
  const [showModal, setShowModal] = useState(false);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const {token} = useAuth();
  const {showError} = useError();
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleShowExchange = () => setShowExchangeModal(true);
  const handleCloseExchange = () => setShowExchangeModal(false);
  const navigate = useNavigate();
  const canExchange = () => {
    const daysFromDelivery = (Date.now() - new Date(order.deliveryDate ? order.deliveryDate : 0)) / (1000 * 60 * 60 * 24);
    if(order.status !== 2 || daysFromDelivery >= 4 || order.exchanged) return false;
    return true;
  }
  const getExchangeDate = () => {
    const exchangeDate = new Date(order.deliveryDate);
    exchangeDate.setDate(exchangeDate.getDate() + 4);
    return exchangeDate.toLocaleDateString('en-GB');
  }
  const handleCancelOrder =async () => {
    const userConfirmed = window.confirm("Are you sure you want to cancel the order?");
    if (userConfirmed) {
      try {
        const res = await fetch(process.env.REACT_APP_BASE_URL + 'cancel-order', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token,
          },
          body: JSON.stringify({ orderID : order.orderID }),
        });
        if(!res.ok){
          throw new Error();
        }
        navigate(0);
        showError("Order Cancelled successfully" , "success");
      } catch (error) {
        showError("Cannot cancel the order, try again");
      }
    }
  }
  return (
    <div className={classes.orderItem}>
      <div className={classes.itemDetails}>
        <div className={classes.detailsText}>
        <div className={classes.modalStatus}>{order.status === 0 ? 'Order Placed' : (order.status === 1 ? "Order Confirmed" : (order.cancelled ? "Order Cancelled" : "Order Delivered"))}</div>
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
        {
          order.status === 0 && !order.cancelled &&
          <div>
            <button  className={classes.cancelButton} onClick={handleCancelOrder}>Cancel Order</button>
            <p>Order Cancellation is valid till order is not confirmed, any payments made will be refunded within 3-5 business days</p>
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
