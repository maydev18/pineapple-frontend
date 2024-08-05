import React, { useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import styles from './Dashboard.module.css';
const Inventory = () => {
  const [orders, setOrders] = useState([
    
    {
        
            productId : "669cc48798f9104fa632e2ac",
            title : "Modern Jean",
            price : 4000,
            small : 100,
            medium : 10,
            large : 50,
            extraLarge : 20,
            doubleExtraLarge : 50,
      
    },
    {
        
        productId : "669cc487875f9104fa632e2ac",
        title : "White Tshirt",
        price : 3000,
        small : 10,
        medium : 150,
        large : 510,
        extraLarge : 20,
        doubleExtraLarge : 50,
  
},
    
  ]);

  return (
      <>
     <div className={styles.alignProducts}>
      <div className={styles.OrdersBox}>
      <h1 className={styles.heading}>Inventory</h1>
      <div className={styles.container}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>S</th>
            <th>M</th>
            <th>L</th>
            <th>XL</th>
            <th>XXL</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.productId}</td>
              <td>{order.title}</td>
              <td>{order.price}</td>
              <td>{order.small}</td>
              <td>{order.medium}</td>
              <td>{order.large}</td>
              <td>{order.extraLarge}</td>
              <td>{order.doubleExtraLarge}</td>
            
            </tr>
          ))}
        </tbody>
      </Table>
    </div></div></div></>
 
  );
};

export default Inventory;
