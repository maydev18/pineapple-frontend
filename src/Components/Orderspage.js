import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import classes from './Orderspage.module.css';
import { getAuthToken } from '../utils/Auth';
import { format } from 'date-fns';
import { useError } from '../context/ErrorContext';
import { Title } from '@mui/icons-material';
const OrdersPage = () => {
  const {showError} = useError();
  const [orders,onOrdersChange] = useState([]);
  const dummyOrders = [
    {
      
      orderID: '001',
      paymentID: 'PAY12345',
      products: [
        { title: 'Product 1', quantity: 2, price: 29.99 },
        { title: 'Product 2', quantity: 1, price: 49.99 }
      ],
      address: '123 Main St, Springfield, IL',
      time: '2024-08-20T12:30:00Z',
      completed: false
    },
    {
      
      orderID: '002',
      paymentID: 'PAY67890',
      products: [
        { title: 'Product 3', quantity: 1, price: 19.99 }
      ],
      address: '456 Elm St, Shelbyville, IL',
      time: '2024-09-01T14:45:00Z',
      completed: true
    }
  ];



  // Replace orderLoader with setting the dummy data
  // const orderLoader = () => {
  //   try {
  //     onOrdersChange(dummyOrders);
  //   } catch (err) {
  //     showError(err.message, 'danger');
  //   }
  // };
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
