import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './OrderModal.module.css'; // Import the CSS module

const OrderDetailsModal = ({ show, handleClose, orderDetails }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton className={styles.modalHeader}>
        <div className={styles.modalHeading}>
        <Modal.Title className={styles.modalTitle}>Order ID: 33490244A5</Modal.Title>
        <Modal.Title className={styles.modalTitle}>payment ID: 33490244A5</Modal.Title>
        </div>
        
        <Modal.Body  className={styles.modalBody}>
           
            <p>2024-07-21T09:46:00.367Z</p></Modal.Body>
            
       <div className={styles.modalStatus}> completed </div>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.orderDetails}>
          <div className={styles.orderSummary}>
            <img src={orderDetails.image} alt="Product" className={`${styles.productImage} mb-3`} />
            <div className={styles.Details}>
                <h5>{orderDetails.title}</h5>
                <p><strong>Size:</strong> {orderDetails.size}</p>
                <p><strong>Quantity:</strong> 3 × Rs 1,500</p>
                <p><strong>Price:</strong> Rs{orderDetails.price}</p>
                <p><strong>Address:</strong> 138, house no 2, krishna nagar, sahdurjung enclave, new delhi, 110034</p>
            </div>
            
          </div>
         
        </div>
      </Modal.Body>
      
    </Modal>
  );
};

export default OrderDetailsModal;
