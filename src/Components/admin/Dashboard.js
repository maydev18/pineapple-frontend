// Dashboard.jsx
import React from 'react';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>

      <section className={styles.dashboard}>
      

        
          <div className={styles.boxed}>
          <h1 className={styles.heading}>Dashboard</h1>
            <h4>Welcome Paras!</h4>
            <button className={styles.btn}>check profile</button>
           
          </div>
          <div className={styles.boxContainer}>
          <div className={styles.box}>
          
            <h3>Add Products</h3>
            <p>Add product Name, Size, <br/>Description, Images, Policies</p>
           <Link to='/addproducts' className={styles.btn}> Add products</Link>
          </div>

          <div className={styles.box}>
            <h3>Edit Product Details</h3>
            <p>Edit product Name, Size, <br/>Description, Images, Policies</p>
            <Link to='/edit' className={styles.btn}> Edit products</Link>
          </div>

          <div className={styles.box}>
          <h3>Order updates</h3>
            <p>Check order updates with<br/>customer information</p>
            <Link to='/placedorder' className={styles.btn}> Add products</Link>
          </div>

          <div className={styles.box}>
          <h3>Inventory</h3>
            <p>Check Remaining stock<br/>in the inventorys</p>
            <Link to='/inventory' className={styles.btn}> Inventory</Link>
          </div>

          

     
          
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
