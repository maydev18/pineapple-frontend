import React from 'react';
import styles from './CartSideBar.module.css';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { getAuthToken } from '../utils/Auth';

const token = getAuthToken();
const isLoggedIn = (token === null || token === 'EXPIRED') ? false : true;

function getsize(size) {
  if (size === 'small') return 'S';
  if (size === 'medium') return 'M';
  if (size === 'large') return 'L';
  if (size === 'extraLarge') return 'XL';
  if (size === 'doubleExtraLarge') return 'XXL';
}

const CartSidebar = ({ isOpen, onClose, getCartItems, cartproducts }) => {
  return (
    <div className={`${styles.cartSidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
      <h1 className={styles.cartHeading}>Cart</h1>
      <hr />
      {cartproducts.map((product, index) => (
        <CartItem 
          key={index}
          image={product.productID.mainImage}
          size={getsize(product.size)}
          quantity={product.quantity}
          price={product.productID.price}
          title={product.productID.title}
          getCartItems={getCartItems}
          id={product.productID._id}
          checkout={false}
        />
      ))}
      <div className={styles.checkoutButton}>
        <Link to='/checkout'><button className={styles.ProceedButton}>Proceed to Payment</button></Link>
      </div>
    </div>
  );
};

export default CartSidebar;
