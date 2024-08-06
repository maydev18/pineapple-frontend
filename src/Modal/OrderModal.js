import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './OrderModal.module.css'; 
function getsize(size){
  if(size === 'small') return 'S';
  if(size === 'medium') return 'M';
  if(size === 'large') return 'L';
  if(size === 'extraLarge') return 'XL';
  if(size === 'doubleExtraLarge') return 'XXL';
}
const OrderDetailsModal = ({ show, handleClose, products , orderID , paymentID , address , completed , date}) => {
  return (
    <Modal size="lg">
      <Modal.Header closeButton className={styles.modalHeader}>
        <div className={styles.modalHeading}>
        <Modal.Title className={styles.modalTitle}>Order ID: {orderID}</Modal.Title>
        <Modal.Title className={styles.modalTitle}>payment ID: {paymentID}</Modal.Title>
        </div>
        
        <Modal.Body  className={styles.modalBody}>
           
            <p>{date}</p></Modal.Body>
            <p style={{color : 'black'}}><strong>Deliver to: </strong>{address.fullName}, {address.phone}</p>
            <p style={{color : 'black'}}><strong>Address:</strong>{address.firstline}, {address.secondLine},{address.city}, {address.state}, {address.pincode}, ({address.landmark})</p>
       <div className={styles.modalStatus}> {completed?'Delivered' : 'processing'} </div>
      </Modal.Header>
        {products.map((pro , index) => (
          <Modal.Body>
          <div className={styles.orderDetails}>
              <div className={styles.orderSummary}>
                  <div className={styles.products}>
                    <img src={pro.image} alt="Product" className={`${styles.productImage} mb-3`} />
                    <div className={styles.Details}>
                        <h5>{pro.title}</h5>
                        <p><strong>Size:</strong> {getsize(pro.size)}</p>
                        <p><strong>Quantity:</strong>{pro.quantity}</p>
                        <p><strong>Price:</strong> Rs{pro.price * pro.quantity}</p>
                    </div>
                  </div>                
              </div>
            </div>
          </Modal.Body>
        ))}
      
    </Modal>
  );
};

export default OrderDetailsModal;