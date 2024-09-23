import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap'; // Assuming React Bootstrap is used
import styles from './Dashboard.module.css';
import { useError } from '../../context/ErrorContext';
import { getAuthToken } from '../../utils/Auth';


const ExchangeItemsTable = () => {
  const [exchangeRequests , setExchangeRequests] = useState([]);
  const [actionStatus, setActionStatus] = useState({});
  const {showError} = useError();
  useEffect(() => {
    const fetchExchangeRequests = async () => {
      try{
        const res = await fetch(process.env.REACT_APP_BASE_URL + 'admin/exchange-tickets' , {
          method : 'get',
          headers : {
            'authorization' : 'bearer ' + getAuthToken()
          }
        });
        if(!res.ok){
          throw new Error();
        }
        const data = await res.json();
        setExchangeRequests(data);
      }
      catch(err){
        showError("failed fetching exchange requests" , "danger");
      }
    }
    fetchExchangeRequests();
  } ,[])

  const handleAction = (productId, action) => {
    setActionStatus((prevState) => ({
      ...prevState,
      [productId]: action,
    }));
  };

  return (
    <div className={styles.alignProducts}>
    <div className={styles.OrdersBox}>
      <h1 className={styles.heading}>Exchange Items</h1>
      <Table bordered hover responsive="sm" className={styles.exchangeTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Details</th>
            <th>Exchange Reasons</th>
            <th>Description</th>
            <th>Exchange Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRequests.map((request) =>
            request.exchangeProducts.map((product) => (
              <tr key={product._id}>
                <td>{request.orderID}</td>
                <td>
                  <div className={styles.orderDetails}>
                    <img
                      src={product.product.image}
                      alt={product.product.title}
                      className={styles.productImage}
                      thumbnail
                    />
                    <div className={styles.productInfo}>
                      <p><strong>{product.product.title}</strong></p>
                      <p>Quantity: {product.product.quantity}</p>
                      <p>Size: {product.product.size}</p>
                      <p>Price: ₹{product.product.price * product.product.quantity}</p>
                    </div>
                  </div>
                </td>
                <td>
                  {product.exchangeReason.length > 0
                    ? product.exchangeReason.join(', ')
                    : 'No reason provided'}
                </td>
                <td>{product.description || 'N/A'}</td>
                <td>{new Date(request.time).toLocaleDateString()}</td>
                <td>
                  {!actionStatus[product._id] && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className={styles.actionButton}
                        onClick={() => handleAction(product._id, 'accepted')}
                      >
                        Accept
                      </Button>{' '}
                      <Button
                        variant="danger"
                        size="sm"
                        className={styles.actionButton}
                        onClick={() => handleAction(product._id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {actionStatus[product._id] === 'accepted' && (
                    <Button variant="success" disabled>
                      Accepted
                    </Button>
                  )}
                  {actionStatus[product._id] === 'rejected' && (
                    <Button variant="danger" disabled>
                      Rejected
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  </div>
  );
};
 
export default ExchangeItemsTable;
