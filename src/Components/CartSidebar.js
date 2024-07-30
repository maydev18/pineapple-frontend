import React, { useEffect, useState } from 'react';
import styles from './CartSideBar.module.css';
import CartItem from './CartItem';
import { Link , redirect} from 'react-router-dom'
import { getAuthToken } from '../utils/Auth';
const token = getAuthToken();
const isLoggedIn = (token === null || token === 'EXPIRED') ? false : true;

function getsize(size){
  if(size === 'small') return 'S';
  if(size === 'medium') return 'M';
  if(size === 'large') return 'L';
  if(size === 'extraLarge') return 'XL';
  if(size === 'doubleExtraLarge') return 'XXL';
}
const CartSidebar = ({isOpen, onClose }) => {
  const [cartproducts , setCartProducts] = useState([]);
  const getCartItems = async () => {
    const res = await fetch("http://localhost:8080/cart" , {
      headers : {
        'Authorization' : 'bearer ' + token
      }
    });
    if(!res.ok){
      alert('failed to fetch cart items');
    }
    else{
      const cartItems = await res.json();
      setCartProducts(cartItems);
    }
  }
  useEffect(() => {
    getCartItems();
  } , [])
  return (
    <div className={`${styles.cartSidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
      <h1 className={styles.cartHeading}>Cart</h1>
      <hr/>
      {cartproducts.map(product => (
        <CartItem 
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
        <Link to='/checkout'><button className={styles.Proceedbutton}>Proceed to Payment</button></Link>
      </div>
    </div>
  );
};

export default CartSidebar;
