import React, { useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import styles from './Dashboard.module.css';
const PlacedOrder = () => {
  const [orders, setOrders] = useState([
    {
      orderID: '#666234',
      orderName: 'White Shirt',
      customerName: 'Anamikal Olith',
      location: '11 Church Road, London',
      date: '12-10-2022',
      amount: '$120.50',
      status: 'Delivered'
    },
    {
      orderID: '#666235',
      orderName: 'Yellow Shirt',
      customerName: 'Robinson Krush',
      location: '33 The Green, London',
      date: '13-10-2022',
      amount: '$160.30',
      status: 'Delivered'
    },
    // Add more orders here...
  ]);

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
  };

  return (
      <>
     <div className={styles.alignProducts}>
      <div className={styles.OrdersBox}>
      <h1 className={styles.heading}>Orders Details</h1>
      <div className={styles.container}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Name</th>
            <th>Customer Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderID}</td>
              <td>{order.orderName}</td>
              <td>{order.customerName}</td>
              <td>{order.location}</td>
              <td>{order.date}</td>
              <td>{order.amount}</td>
              <td>
                <Form.Select
                  value={order.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div></div></div></>
 
  );
};

export default PlacedOrder;
