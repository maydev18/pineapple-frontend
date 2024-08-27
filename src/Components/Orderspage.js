import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import classes from './Orderspage.module.css';
import { getAuthToken } from '../utils/Auth';
import { format } from 'date-fns';
import { useError } from '../context/ErrorContext';
const OrdersPage = () => {
  const {showError} = useError();
  const [orders,onOrdersChange] = useState([]);
  const orderLoader = async () => {
    try{
      const res = await fetch('http://localhost:8080/orders' , {
        headers : {
          'Authorization' : 'bearer ' + getAuthToken()
        }
      });
      if(!res.ok){
        const err = await res.json();
        throw err;
      }
      const resData = await res.json();
      onOrdersChange(resData);
    }
    catch(err){
      showError(err.message , 'danger');
    }
  }
  useEffect(() => {
    orderLoader();
  } , [])
  const handleCancel = (orderId) => {
    console.log(`Cancel order with ID: ${orderId}`);
  };
  return (
    <div className={classes.ordersPage}>
      <h1>My Orders</h1>
      {orders.map(order => (
        <OrderItem
          key={order.orderID}
          orderID={order.orderID}
          paymentID={order.paymentID}
          products={order.products}
          address={order.address}
          time={format(new Date(order.time) , 'MMMM do, yyyy')}
          onCancel={() => handleCancel(order.id)}
          completed={order.completed}
        />
      ))}
    </div>
  );
};

export default OrdersPage;
