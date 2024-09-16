import React, { useState } from 'react';
import { Modal, Button, Form, Collapse } from 'react-bootstrap'; // Using Collapse from React Bootstrap
import styles from './OrderModal.module.css';
import { Link } from 'react-router-dom';
import front from '../images/front.jpg';

const ExchangeModal = ({ show, handleClose, products, orderID }) => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [exchangeDetails, setExchangeDetails] = useState({});

  // Handle checkbox change
  const handleProductSelect = (index) => {
    setSelectedProducts(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  // Handle detail input change
  const handleDetailChange = (index, value) => {
    setExchangeDetails(prevState => ({
      ...prevState,
      [index]: value
    }));
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Exchange Items for Order {orderID}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {products.map((product, index) => (
            <div key={index}>
              <Form.Check
                type="checkbox"
                label={
                  <div className={styles.ExchangeDetails}>
                    <div className={styles.products}>
                      <img
                        src={front}
                        alt="Product"
                        className={`${styles.productImage} mb-3`}
                      />
                      <div className={styles.Details}>
                        <h5>{product.title}</h5>
                        <div className={styles.Description}>
                          <div>
                          <h2><strong>{product.title}</strong></h2>
                    <p>Order ID: {product.OrderID}</p>
                    <p>Qty: {product.quantity}</p>
                    <p>Price: ₹ {product.price * product.quantity}</p>
                          </div>
                          <div className={styles.price}>
                            <p><strong>Price: </strong> ₹ {product.price * product.quantity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                onChange={() => handleProductSelect(index)}
              />
              <Collapse in={selectedProducts[index]}>
                <div className={styles.collapse}>
                  <p style={{ color: "black", textAlign: "left", fontSize: "20px" }}>Reason for Exchange</p>
                  <Form.Check
                    type="checkbox"
                    label="Size or Fit Issue"
                    name={`exchangeReason-${index}`}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Damaged Product"
                    name={`exchangeReason-${index}`}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Wrong Item Delivered"
                    name={`exchangeReason-${index}`}
                  />
                  <Form.Group controlId={`exchangeDetails-${index}`} className={styles.detailsGroup}>
                    <p style={{color: 'black', textAlign: 'left', fontSize: "15px", fontWeight: 400, marginBottom: '5px', marginTop: '1rem'}}>Additional Details</p>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={exchangeDetails[index] || ''}
                      onChange={(e) => handleDetailChange(index, e.target.value)}
                      placeholder="Provide more details about the exchange (optional)"
                      className={styles.detailsInput}
                    />
                  </Form.Group>
                  <button className={styles.Reviewbutton}>Exchange</button>
                </div>
              </Collapse>
            </div>
          ))}
        </Form>
      </Modal.Body>
      
    </Modal>
  );
};

export default ExchangeModal;
