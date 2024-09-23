import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap'; // Assuming React Bootstrap is used
import styles from './Dashboard.module.css';
import { useError } from '../../context/ErrorContext';
import { getAuthToken } from '../../utils/Auth';


const ExchangeItemsTable = () => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [exchangeRequests , setExchangeRequests] = useState([]);
  const [actionStatus, setActionStatus] = useState({});
  const {showError} = useError();
  // useEffect(() => {
  //   const fetchExchangeRequests = async () => {
  //     try{
  //       const res = await fetch(process.env.REACT_APP_BASE_URL + 'admin/exchange-tickets' , {
  //         method : 'get',
  //         headers : {
  //           'authorization' : 'bearer ' + getAuthToken()
  //         }
  //       });
  //       if(!res.ok){
  //         throw new Error();
  //       }
  //       const data = await res.json();
  //       setExchangeRequests(data);
  //     }
  //     catch(err){
  //       showError("failed fetching exchange requests" , "danger");
  //     }
  //   }
  //   fetchExchangeRequests();
  // } ,[])

  const dummyData = [
    {
      _id: "66ec93efc5f2b4aff9204965",
      orderID: "order_Oz96po9f2WSo0w",
      time: "2024-09-19T21:13:15.214Z",
      exchangeProducts: [
        {
          exchangeReason: ["Size or Fit Issue", "Wrong Item Delivered"],
          description: "the product was very bad",
          product: {
            _id: "66a507acc4720b336848e423",
            price: 1000,
            quantity: 2,
            size: "large",
            image: "http://localhost:8080/1722091436141-DSC04299 copy.jpg",
            title: "coffee brown oversized t-shirt",
            reviewed: true,
          },
          _id: "66ec93efc5f2b4aff9204966",
        },
        {
          exchangeReason: ["Damaged Product"],
          description: "",
          product: {
            _id: "66a50ae1c4720b336848e425",
            price: 1000,
            quantity: 1,
            size: "medium",
            image: "http://localhost:8080/1722092257500-DSC04239 copy.jpg",
            title: "\"better than yesterday\" oversized t-shirt",
            reviewed: false,
          },
          _id: "66ec93efc5f2b4aff9204967",
        },
      ],
      __v: 0,
    },
    {
      _id: "66ec94d92d961c11d702c946",
      userID: "66a4f94d41481a1c1f5784ec",
      orderID: "order_Oz96po9f2WSo0w",
      time: "2024-09-19T21:16:11.046Z",
      exchangeProducts: [
        {
          exchangeReason: ["Size or Fit Issue"],
          description: "",
          product: {
            _id: "66a507acc4720b336848e423",
            price: 1000,
            quantity: 2,
            size: "large",
            image: "http://localhost:8080/1722091436141-DSC04299 copy.jpg",
            title: "coffee brown oversized t-shirt",
            reviewed: true,
          },
          _id: "66ec94d92d961c11d702c947",
        },
      ],
      __v: 0,
    },
  ];

  useEffect(() => {
    setExchangeRequests(dummyData);
  }, []);

  
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
                    <div>
                    <img
                      src={product.product.image}
                      alt={product.product.title}
                      className={styles.productImage}
                      thumbnail
                    />
                    </div>
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
