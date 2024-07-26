import React from 'react';
import styles from './CartSideBar.module.css';

const CartSidebar = ({ product, quantity, selectedSize, isOpen, onClose }) => {
  return (
    <div className={`${styles.cartSidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
      <h1 className={styles.cartHeading}>Cart</h1>
      <div className={styles.cartItem}>
        <img src={product.mainImage} alt={product.name} className={styles.cartItemImage} />
        <div className={styles.cartItemDetails}>
          <h4>{product.name}</h4>
          <p>Size: {selectedSize}</p>
          <p>Quantity: {quantity}</p>
          <p>Price: {product.price}</p>
        </div>
      </div>
      <div className={styles.checkoutButton}>
        <button className={styles.button}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CartSidebar;
