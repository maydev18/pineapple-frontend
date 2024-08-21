import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
const Inventory = () => {
  const [products , setProducts] = useState([]);
  const [search , setSearch] = useState("");
  const [filter , setFilter] = useState([]);
  useEffect(()=> {
    const fetchProducts = async ()=>{
      const res = await fetch(process.env.REACT_APP_BASE_URL + 'products');
      const prod = await res.json();
      console.log(prod);
      setProducts(prod.products);
      setFilter(prod.products);
    }
    fetchProducts();
  } , [])
  useEffect(() => {
    const result = products.filter(product => {
      const query = search.toLowerCase();
      return product._id.toLowerCase().match(query) ||
      product.title.toLowerCase().match(query)
    });
    setFilter(result);
  } , [search]);
  return (
      <>
     <div className={styles.alignProducts}>
      <div className={styles.OrdersBox}>
      <h1 className={styles.heading}>Inventory</h1>
      <div className={styles.container}>
      <div class="container mt-4">
        <div class="d-flex justify-content-end">
          <input type="text"
            className="w-25 form-control justify-content-end"
            placeholder="search..."
            values = {search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {filter.length > 0 ?  (
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Product ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>S</th>
            <th>M</th>
            <th>L</th>
            <th>XL</th>
            <th>XXL</th>
          </tr>
        </thead>
        <tbody>
          {filter.map((product, index) => (
            <tr key={index}>
              <td><Link to = {'/products/' + product._id}><img src={product.mainImage} style={{width : "3rem" , height : "auto"}}></img></Link></td>
              <td>{product._id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.small}</td>
              <td>{product.medium}</td>
              <td>{product.large}</td>
              <td>{product.extraLarge}</td>
              <td>{product.doubleExtraLarge}</td>
            
            </tr>
          ))}
        </tbody>
      </Table>
      ) : (
        <h1>No products to show</h1>
      )}
    </div></div></div></>
 
  );
};

export default Inventory;
