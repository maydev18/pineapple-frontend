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
          <h4>Welcome Admin</h4>
          <button className={styles.btn}>check profile</button>

        </div>
        <div className={styles.boxContainer}>
          <div className={styles.box}>

            <h3>Add Products</h3>
            <p>Add product Name, Size, <br />Description, Images, Policies</p>
            <Link to='/admin/addproducts' className={styles.btn}> Add products</Link>
          </div>

          <div className={styles.box}>
            <h3>Order updates</h3>
            <p>Check order updates with<br />customer information</p>
            <Link to='/admin/placedorder' className={styles.btn}>Orders</Link>
          </div>

          <div className={styles.box}>
            <h3>Inventory</h3>
            <p>Check Remaining stock<br />in the inventory</p>
            <Link to='/admin/inventory' className={styles.btn}> Inventory</Link>
          </div>

          <div className={styles.box}>
            <h3>Exchange</h3>
            <p>check updates regarding <br />Exchange Requests</p>
            <Link to='/admin/exchange' className={styles.btn}> Exchange Requests</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
