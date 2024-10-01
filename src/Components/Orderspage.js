import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import classes from './Orderspage.module.css';
import { useError } from '../context/ErrorContext';
import { useAuth } from '../context/AuthContext';
import { Spinner } from 'react-bootstrap';
import { AlignCenter } from 'react-bootstrap-icons';
const OrdersPage = () => {
  const {showError} = useError();
  const {token} = useAuth();
  const [orders,onOrdersChange] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  async function orderLoader() {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}orders`, {
        headers: {
          'Authorization': 'bearer ' + token
        }
      });
      if (!res.ok) {
        const err = await res.json();
        throw err;
      }
      let resData = await res.json();
      resData = resData.reverse()
      onOrdersChange(resData);
    }
    catch (err) {
      showError(err.message, 'danger');
    }
    finally{
      setIsLoading(false);
    }
  }
  useEffect(() => {
    orderLoader();
  } , [])
  return (
    <div className={classes.ordersPage}>
      <h1>My Orders</h1>
      {(orders.length === 0 && !isLoading) ? (
        <p style={{color: 'grey', fontSize: '18px' , textAlign: 'center'}}>No orders yet</p> 
      ) : (
        isLoading ? <Spinner/> : 
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