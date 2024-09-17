import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap'; // Assuming React Bootstrap is used
import styles from './Dashboard.module.css';
import front from '../../images/front.jpg';

const ExchangeItemsTable = () => {
  // Dummy products data
  const products = [
    {
      OrderID: 1,
      title: 'Classic T-Shirt',
      image: front,
      size: 'medium',
      exchangedSize: 'large',
      quantity: 2,
      price: 500,
      shippingAdress: 'house no 138, second floor',
      reason: 'size or fit issue'
    },
    {
      OrderID: 2,
      title: 'Denim Jeans',
      image: front,
      size: 'large',
      exchangedSize: 'extraLarge',
      quantity: 1,
      price: 1200,
      shippingAdress: 'house no 138, second floor',
      reason: 'size or fit issue'
    },
    {
      OrderID: 3,
      title: 'Sports Shoes',
      image: front,
      size: 'extraLarge',
      exchangedSize: 'small',
      quantity: 1,
      price: 3000,
      shippingAdress: 'house no 138, second floor',
      reason: 'size or fit issue'
    },
  ];

  const [selectedProducts, setSelectedProducts] = useState({});

  const handleProductSelect = (index, action) => {
    setSelectedProducts((prevState) => ({
      ...prevState,
      [index]: action === 'select',
    }));
  };

  const handleSubmit = () => {
    console.log('Selected Products:', selectedProducts);
  };

  return (
    <div className={styles.alignProducts}>
    <div className={styles.OrdersBox}>
    <h1 className={styles.heading}>Exchange Items</h1>
      <Table bordered hover className={styles.exchangeTable}>
        <thead>
          <tr>
            <th>Action</th>
            <th>Order Details</th>
            <th>Shipping Address</th>
            <th>Original Size</th>
            <th>Exchanged Size</th>
            <th>Reason for Exchange</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                {selectedProducts[index] === true ? (
                  <Button
                    variant="success"
                    onClick={() => handleProductSelect(index, 'reject')}
                  >
                    Accepted
                  </Button>
                ) : selectedProducts[index] === false ? (
                  <Button
                    variant="danger"
                    onClick={() => handleProductSelect(index, 'select')}
                  >
                    Rejected
                  </Button>
                ) : (
                  <>
                    <Button
                     variant="success"
                      onClick={() => handleProductSelect(index, 'select')}
                      className={styles.actionButton}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleProductSelect(index, 'reject')}
                      className={styles.actionButton}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
              <td>
                <div className={styles.productDetails}>
                  <img
                    src={product.image}
                    alt="Product"
                    className={styles.productImage}
                  />
                  <div className={styles.orderDetail}>
                    <h2><strong>{product.title}</strong></h2>
                    <p>Order ID: {product.OrderID}</p>
                    <p>Qty: {product.quantity}</p>
                    <p>Price: ₹ {product.price * product.quantity}</p>
                  </div>
                </div>
              </td>
              <td>{product.shippingAdress}</td>
              <td>{product.size}</td>
              <td>{product.exchangedSize}</td>
              <td>{product.reason}</td>
            </tr>
          ))}
        </tbody>
      </Table>
     
    
    </div>
    </div>
   
  );
};

export default ExchangeItemsTable;
