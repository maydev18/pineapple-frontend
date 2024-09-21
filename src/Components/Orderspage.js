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
        "_id": "66ec93efc5f2b4aff9204965",
        "orderID": "order_Oz96po9f2WSo0w",
        "time": "2024-09-19T21:13:15.214Z",
        "exchangeProducts": [
            {
                "exchangeReason": [
                    "Size or Fit Issue",
                    "Wrong Item Delivered"
                ],
                "description": "the product was very bad",
                "product": {
                    "_id": "66a507acc4720b336848e423",
                    "price": 1000,
                    "quantity": 2,
                    "size": "large",
                    "image": "http://localhost:8080/1722091436141-DSC04299 copy.jpg",
                    "title": "coffee brown oversized t-shirt",
                    "reviewed": true
                },
                "_id": "66ec93efc5f2b4aff9204966"
            },
            {
                "exchangeReason": [
                    "Damaged Product"
                ],
                "description": "",
                "product": {
                    "_id": "66a50ae1c4720b336848e425",
                    "price": 1000,
                    "quantity": 1,
                    "size": "medium",
                    "image": "http://localhost:8080/1722092257500-DSC04239 copy.jpg",
                    "title": "\"better than yesterday\" oversized t-shirt",
                    "reviewed": false
                },
                "_id": "66ec93efc5f2b4aff9204967"
            }
        ],
        "__v": 0
    },
    {
        "_id": "66ec94d92d961c11d702c946",
        "userID": "66a4f94d41481a1c1f5784ec",
        "orderID": "order_Oz96po9f2WSo0w",
        "time": "2024-09-19T21:16:11.046Z",
        "exchangeProducts": [
            {
                "exchangeReason": [
                    "Size or Fit Issue"
                ],
                "description": "",
                "product": {
                    "_id": "66a507acc4720b336848e423",
                    "price": 1000,
                    "quantity": 2,
                    "size": "large",
                    "image": "http://localhost:8080/1722091436141-DSC04299 copy.jpg",
                    "title": "coffee brown oversized t-shirt",
                    "reviewed": true
                },
                "_id": "66ec94d92d961c11d702c947"
            }
        ],
        "__v": 0
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
  const handleCancel = (orderId) => {
    console.log(`Cancel order with ID: ${orderId}`);
  };
  return (
    <div className={classes.ordersPage}>
      <h1>My Orders</h1>
      {dummyOrders.map((order , index) => (
        <OrderItem
          key={index}
          order={order}
          onCancel={() => handleCancel(order.id)}
        />
      ))}
    </div>
  );
};

export default OrdersPage;
