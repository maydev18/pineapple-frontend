import React from 'react';
import OrderItem from './OrderItem';
import classes from './Orderspage.module.css';
import back from '../images/back.jpg'

const OrdersPage = () => {
  const handleCancel = (orderId) => {
    // Handle cancel order logic here
    console.log(`Cancel order with ID: ${orderId}`);
  };
  

  const orders = [
    {
      id: 1,
      image: back,
      title: 'Cotton Wrap Top',
      size: 'L',
      price: 'Rs 30',
    },
    {
        id: 1,
        image: back,
        title: 'Cotton Wrap Top',
        size: 'L',
        price: 'RS 30',
      },
    // Add more orders as needed
  ];

  return (
    <div className={classes.ordersPage}>
      <h1>My Orders</h1>
      {orders.map(order => (
        <OrderItem
          key={order.id}
          image={order.image}
          title={order.title}
          size={order.size}
          price={order.price}
          onCancel={() => handleCancel(order.id)}
        />
      ))}
    </div>
  );
};

export default OrdersPage;
