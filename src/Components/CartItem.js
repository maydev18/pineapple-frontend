import React, { useState } from 'react';
import classes from './CartItem.module.css';
import { getAuthToken } from '../utils/Auth';
import { Spinner } from 'react-bootstrap';
function convertSize(size){
  if(size === 'S') return 'small';
  if(size === 'M') return 'medium';
  if(size === 'L') return 'large';
  if(size === 'XL') return 'extraLarge';
  if(size === 'XXL') return 'doubleExtraLarge';
}
const CartItem = ({ id , image, size, quantity, price, title , getCartItems , checkout}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIncrease =async () => {
    setIsSubmitting(true);
    const res = await fetch('http://localhost:8080/add-to-cart' , {
      method : "post",
      headers : {
        'Content-Type': 'application/json',
        'Authorization' : 'bearer ' + getAuthToken()
      },
      body : JSON.stringify({
        productID : id,
        size : convertSize(size)
      })
    });
    if(res.ok){
      getCartItems();
    }
    else{
      alert('Failed adding to cart');
    }
    setIsSubmitting(false);
  };

  const handleDecrease = async () => {
    setIsSubmitting(true);
    const res = await fetch('http://localhost:8080/delete-from-cart' , {
      method : "post",
      headers : {
        'Content-Type': 'application/json',
        'Authorization' : 'bearer ' + getAuthToken()
      },
      body : JSON.stringify({
        productID : id,
        size : convertSize(size)
      })
    });
    if(res.ok){
      getCartItems();
    }
    else{
      alert('Failed adding to cart');
    }
    setIsSubmitting(false);
  };

  return (
    <div className={classes.cartItem}>
      <img src={image} alt="Product" className={classes.cartItemImage} />
      <div className={classes.cartItemDetails}>
        <h2>{title}</h2>
        <h4><span>Size:</span> {size}</h4>
        <h4><span>Price: </span>{price}</h4>
        {checkout &&  <h4><span>Quantity: </span>{quantity}</h4>}
        {!checkout && <div className={classes.quantityBar}>
          <div className={classes.quantity}>
          <button className={classes.quantityButton} onClick={handleDecrease}>{isSubmitting ? <Spinner animation="border" /> : '-'}</button>
          <input type="number" className={classes.quantityInput} value={quantity} readOnly />
          <button className={classes.quantityButton} onClick={handleIncrease}>{isSubmitting ? <Spinner animation="border" /> : '+'}</button>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default CartItem;
