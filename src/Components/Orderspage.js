import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import classes from './Orderspage.module.css';
import { getAuthToken } from '../utils/Auth';
import { useError } from '../context/ErrorContext';
const OrdersPage = () => {
  const {showError} = useError();
  const [orders,onOrdersChange] = useState([]);
  
  async function orderLoader() {
    try {
      const res = await fetch('http://localhost:8080/orders', {
        headers: {
          'Authorization': 'bearer ' + getAuthToken()
        }
      });
      if (!res.ok) {
        const err = await res.json();
        throw err;
      }
      const resData = await res.json();
      onOrdersChange(resData);
    }
    catch (err) {
      showError(err.message, 'danger');
    }
  }
  useEffect(() => {
    orderLoader();
  } , [])
  return (
    <div className={classes.ordersPage}>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p style={{color: 'grey', fontSize: '18px'}}>No orders yet</p> 
      ) : (
        orders.map((order, index) => (
          <OrderItem
            key={index}
            order={order}
          />
        ))
      )}
    </div>
  );  
};

export default OrdersPage;