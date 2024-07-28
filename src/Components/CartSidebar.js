import React, { useState } from 'react';
import styles from './CartSideBar.module.css';
import CartItem from './CartItem';
import { Link } from 'react-router-dom'

const CartSidebar = ({ product, initialQuantity, selectedSize, isOpen, onClose }) => {
  return (
    <div className={`${styles.cartSidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
      <h1 className={styles.cartHeading}>Cart</h1>
      <hr/>
      <CartItem 
        image={product.mainImage}
        size={selectedSize}
        initialQuantity={initialQuantity}
        price={product.price}
       
        title={product.title}
      />
      <div className={styles.checkoutButton}>
        <Link to='/checkout'><button className={styles.Proceedbutton}>Proceed to Payment</button></Link>
      </div>
    </div>
  );
};

export default CartSidebar;
