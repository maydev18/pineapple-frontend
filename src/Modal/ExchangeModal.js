import React, { useState } from 'react';
import { Modal, Form, Collapse } from 'react-bootstrap'; // Using Collapse from React Bootstrap
import styles from './OrderModal.module.css';
import { useError } from '../context/ErrorContext';
import {Spinner} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const ExchangeModal = ({ show, handleClose, products, orderID }) => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [exchangeDetails, setExchangeDetails] = useState({});
  const [exchangeReasons, setExchangeReasons] = useState({});  // Store reasons
  const [isSubmitting , setIsSubmitting] = useState(false);
  const {showError} = useError();
  const {isLoggedIn , token} = useAuth();
  // Handle checkbox change
  const navigate = useNavigate();
  const handleProductSelect = (index) => {
    setSelectedProducts(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  
  const handleDetailChange = (index, value) => {
    setExchangeDetails(prevState => ({
      ...prevState,
      [index]: value
    }));
  };

  const handleReasonChange = (index, reason) => {
    setExchangeReasons(prevState => ({
      ...prevState,
      [index]: {
        ...(prevState[index] || {}),  
        [reason]: !prevState[index]?.[reason]  
      }
    }));
  };
  const createRequestBody = () => {
    const productsWithReason = products.map((product , index) => {
      const reasons = exchangeReasons[index] ? Object.keys(exchangeReasons[index]).filter(reason => exchangeReasons[index][reason]) : [];
      return {
        exchangeReason : reasons , 
        description : exchangeDetails[index] || "",
        product : product
      }
    })
    const selectedExchangeProducts = productsWithReason.filter((_ , index) => selectedProducts[index])
    const requestBody = {
      orderID : orderID,
      exchangeProducts : selectedExchangeProducts
    };
    console.log(requestBody);
    return requestBody;
  }
  // console.log(exchangeReasons);
  const submitHandler = async () => {
    try{
      setIsSubmitting(true);
      const body = JSON.stringify(createRequestBody());
      const res = await fetch(process.env.REACT_APP_BASE_URL + "exchanges/create-exchange-ticket" , {
        headers : {
          "content-type" : 'application/json',
          "authorization" : "bearer " + token
        },
        method : 'POST',
        body : body
      })
      if(!res.ok){
        const err =  await res.json();
        throw err;
      }
      navigate(0);
      showError("Exchange request is submitted successfully" , 'success');
    }
    catch(err){
      showError(err.message , "danger");
    }
    finally{
      setIsSubmitting(false)
    }
  };
  const isFormValid = () => {
    const selectedProductIndices = Object.keys(selectedProducts).filter(index => selectedProducts[index]);

    // 1. Ensure that at least one product is selected
    if (selectedProductIndices.length === 0) {
      return false;
    }

    // 2. Ensure that each selected product has at least one reason selected
    for (let index of selectedProductIndices) {
      const reasons = exchangeReasons[index]
        ? Object.keys(exchangeReasons[index]).filter(reason => exchangeReasons[index][reason])
        : [];
      if (reasons.length === 0) {
        return false; // If no reasons are selected, the form is invalid
      }
    }
    return true; // Form is valid if all conditions are satisfied
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
                        src={product.image}
                        alt="Product"
                        className={`${styles.productImage} mb-3`}
                      />
                      <div className={styles.Details}>
                        <h5>{product.title}</h5>
                        <div className={styles.Description}>
                          <div>
                          
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
                <p style={{ color: 'black', textAlign: 'left', fontSize: '20px' }}>
                    Reason for Exchange
                  </p>
                  <Form.Check
                    type="checkbox"
                    label="Size or Fit Issue"
                    onChange={() => handleReasonChange(index, 'Size or Fit Issue')}
                    checked={exchangeReasons[index]?.['Size or Fit Issue'] || false}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Damaged Product"
                    onChange={() => handleReasonChange(index, 'Damaged Product')}
                    checked={exchangeReasons[index]?.['Damaged Product'] || false}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Wrong Item Delivered"
                    onChange={() => handleReasonChange(index, 'Wrong Item Delivered')}
                    checked={exchangeReasons[index]?.['Wrong Item Delivered'] || false}
                  />
                  <Form.Group controlId={`exchangeDetails-${index}`} className={styles.detailsGroup}>
                    <p style={{ color: 'black', textAlign: 'left', fontSize: "15px", fontWeight: 400, marginBottom: '5px', marginTop: '1rem' }}>Additional Details</p>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={exchangeDetails[index] || ''}
                      onChange={(e) => handleDetailChange(index, e.target.value)}
                      placeholder="Provide more details about the exchange (optional)"
                      className={styles.detailsInput}
                    />
                  </Form.Group>
                </div>
              </Collapse>
            </div>
          ))}
          {<button 
            className={styles.Reviewbutton} 
            onClick={submitHandler} 
            disabled = {isSubmitting || !isFormValid()}
            style={{
              cursor: !isFormValid() ? 'not-allowed' : 'pointer', 
              opacity: !isFormValid() ? 0.6 : 1,
            }}
            >
              {isSubmitting ? <Spinner/> : "Exchange"}
            </button>}
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default ExchangeModal;
