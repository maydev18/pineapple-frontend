import React from 'react';
import '../index.css';

const CartSidebar = ({ product, quantity, selectedSize, isOpen, onClose }) => {
  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>X</button>
      <h1 className='cart-heading'>Cart</h1>
      <div className="cart-item">
        <img src={product.mainImage} alt={product.name} className="cart-item-image" />
        <div className="cart-item-details">
          <h4>{product.name}</h4>
          <p>Size: {selectedSize}</p>
          <p>Quantity: {quantity}</p>
          <p>Price: {product.price}</p>
        </div>
      </div>
      <div className='checkout-button'>
        <button className='button'>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CartSidebar;
