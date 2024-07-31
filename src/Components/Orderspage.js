import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import classes from './Orderspage.module.css';
import { getAuthToken } from '../utils/Auth';

function getsize(size){
  if(size === 'small') return 'S';
  if(size === 'medium') return 'M';
  if(size === 'large') return 'L';
  if(size === 'extraLarge') return 'XL';
  if(size === 'doubleExtraLarge') return 'XXL';
}
const OrdersPage = () => {
  const [orders,onOrdersChange] = useState([]);
  useEffect(() => {
    const orderLoader = async () => {
      const res = await fetch('http://localhost:8080/orders' , {
        headers : {
          'Authorization' : 'bearer ' + getAuthToken()
        }
      });
      if(!res.ok){
        alert('failed to fetch orders');
      }
      const resData = await res.json();
      console.log(resData);
      onOrdersChange(resData);
    }
    orderLoader();
  } , [])
  const handleCancel = (orderId) => {
    // Handle cancel order logic here
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
          image={order.products[0].image}
          size={getsize(order.products[0].size)}
          price={order.products[0].price}
          quantity={order.products[0].quantity}
          onCancel={() => handleCancel(order.id)}
        />
      ))}
    </div>
  );
};

export default OrdersPage;
