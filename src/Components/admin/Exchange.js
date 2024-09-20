import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap'; // Assuming React Bootstrap is used
import styles from './Dashboard.module.css';
import { useError } from '../../context/ErrorContext';
import { getAuthToken } from '../../utils/Auth';

const ExchangeItemsTable = () => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [exchangeRequests , setExchangeRequests] = useState([]);
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

  const handleProductSelect = (index, action) => {
    setSelectedProducts((prevState) => ({
      ...prevState,
      [index]: action === 'select',
    }));
  };
  return (
    <div className={styles.alignProducts}>
      <div className={styles.OrdersBox}>
        <h1 className={styles.heading}>Exchange Items</h1>
        <Table bordered hover className={styles.exchangeTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product Title</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Exchange Reasons</th>
              <th>Description</th>
              <th>Exchange Date</th>
            </tr>
          </thead>
          <tbody>
            {exchangeRequests.map((request) => (
              request.exchangeProducts.map((product) => (
                <tr key={product._id}>
                  <td>{request.orderID}</td>
                  <td>{product.product.title}</td>
                  <td>{product.product.quantity}</td>
                  <td>₹ {product.product.price * product.product.quantity}</td>
                  <td>
                    {product.exchangeReason.length > 0 
                      ? product.exchangeReason.join(', ') 
                      : 'No reason provided'}
                  </td>
                  <td>{product.description || 'N/A'}</td>
                  <td>{new Date(request.time).toLocaleDateString()}</td>
                </tr>
              ))
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
  };
  
export default ExchangeItemsTable;
