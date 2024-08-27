import React, { useState } from 'react';
import { Modal, Button, Accordion, Form } from 'react-bootstrap';
import styles from './OrderModal.module.css';
import StarRating from '../Components/StarRating';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { getAuthToken } from '../utils/Auth';
import { Link } from 'react-router-dom';
import { getsize } from '../utils/cartUtils/convertSize';

const OrderDetailsModal = ({ show, handleClose, products, orderID, paymentID, address, completed, date, reviews , setReviews }) => {
  const [reviewOpenIndex, setReviewOpenIndex] = useState(null);
  const [username, setUserName] = useState('');
  const [stars, setStars] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewSubmit = async (event , id) => {
    setIsSubmitting(true);
    event.preventDefault();
    const res = await fetch('http://localhost:8080/post-review', {
      method: 'post',
      headers : {
        "Authorization" : 'bearer ' + getAuthToken(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stars: stars,
        content: content,
        buyer: username,
        productID: id,
        orderID : orderID
      }),
    });
    if (res.ok) {
      const savedReview = await res.json();
      console.log(savedReview);
      // setReviews([...reviews, savedReview]);
    } else {
      alert('failed to post a review');
    }
    setIsSubmitting(false);
    setStars(0);
    setContent('');
    setUserName('');
  };


  const toggleReviewAccordion = (index) => {
    setReviewOpenIndex(index === reviewOpenIndex ? null : index);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton className={styles.modalHeader}>
        <div className={styles.modalHeading}>
          <Modal.Title className={styles.modalTitle}>Order Details</Modal.Title>
          <p style={{ marginLeft: '2rem', color: 'black', fontSize: '20px' }}>Order Id: {orderID}</p>
          <div className={styles.modalStatus}>{completed ? 'Delivered' : 'Processing'}</div>
        </div>
        <p>{date}</p>
      </Modal.Header>

      {products.map((pro, index) => (
        <div key={index}>
          <Modal.Body>
            <div className={styles.orderDetails}>
              <div className={styles.products}>
                <Link to = {'/products/' + pro._id}><img src={pro.image} alt="Product" className={`${styles.productImage} mb-3`} /> </Link>
                <div className={styles.Details}>
                  <h5>{pro.title}</h5>
                  <div className={styles.Description}>
                    <div>
                      <p><strong>Size: </strong> {getsize(pro.size)}</p>
                      <p><strong>Qty: </strong>{pro.quantity}</p>
                    </div>
                    <div className={styles.price}>
                      <p><strong>Price: </strong> ₹ {pro.price * pro.quantity}</p>
                    </div>
                  </div>
                  {!pro.reviewed && completed && (
                    <button className={styles.writeReviewLink} onClick={() => toggleReviewAccordion(index , )} style={{ background: 'none', border: 'none', padding: 0, color: '#007bff', cursor: 'pointer', fontSize: '15px'}}>
                      Write a Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>

          <Accordion className={styles.reviewAccordion} activeKey={reviewOpenIndex === index ? '0' : null}>
            <Accordion.Collapse eventKey="0">
              <Modal.Body>
                <Form onSubmit={(e)=>{handleReviewSubmit(e , pro._id)}}>
                  <Form.Group>
                  <StarRating rating={stars} onRatingChange={setStars} disabled={isSubmitting} /> 
                  </Form.Group>
                  <Form.Group controlId={`reviewName-${index}`}>
                    <Form.Label style={{marginBottom: '0rem', marginLeft: '0.2rem', color: 'black', fontWeight: '500'}}>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name"  value={username}
                onChange={(e) => setUserName(e.target.value)}
                disabled={isSubmitting}/>
                  </Form.Group>

                  <Form.Group controlId={`reviewText-${index}`}>
                    <Form.Label style={{marginBottom: '0.5rem', marginLeft: '0.2rem', color: 'black', fontWeight: '500'}} >Review</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Write your review"  onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting} style={{marginBottom: '1rem'}}/>
                  </Form.Group>

                <button type="submit" className={styles.Reviewbutton} disabled={isSubmitting}> 
                  Submit Review
                </button>
                </Form>
              </Modal.Body>
            </Accordion.Collapse>
          </Accordion>
        </div>
      ))}
    </Modal>
  );
};

export default OrderDetailsModal;
