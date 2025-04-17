import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import classes from './Orderspage.module.css';
import { useError } from '../context/ErrorContext';
import { useAuth } from '../context/AuthContext';
import { Spinner } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import io from "socket.io-client";


const OrdersPage = () => {
  const {showError} = useError();
  const {token} = useAuth();
  const [orders, setOrders] = useState([]);
  const {isPending , isError , data , error} = useQuery({
    queryKey : ['orders'] ,
    queryFn : async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}orders`, {
        headers: {
          'Authorization': 'bearer ' + token
        }
      });
      if (!res.ok) {
        throw new Error('Failed to fetch orders');
      }
      return res.json(); 
    },
  });
  useEffect(() => {
    if(data) setOrders(data);
  } , [data])
  useEffect(() => {
    const socket = io(process.env.REACT_APP_BASE_URL);
    socket.on("orderStatusUpdated", (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderID === updatedOrder.orderID ? updatedOrder : order
        )
      );
    });
    return () => {
      socket.off("orderStatusUpdated");
      socket.disconnect();
    };
  }, []);
  
  if(isPending){
    return <Spinner/>;
  }
  if(isError){
    showError(error.message, 'danger');
  }
  window.scroll(0,0);
  return (
    <div className={classes.ordersPage}>
      <h1>My Orders</h1>
      {(orders.length === 0) ? (
        <p style={{color: 'grey', fontSize: '18px' , textAlign: 'center'}}>No orders yet</p> 
      ): (
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