// src/Components/CartContainer.js
import React, { useState } from 'react';
import CartSidebar from './CartSidebar'; // Import the CartSidebar component

const CartContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const product = {
    name: 'Fuscia suit',
    mainImage: 'https://via.placeholder.com/150',
    price: 'Free',
  };
  const quantity = 1;
  const selectedSize = 'M';

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>View Cart</button>
      <CartSidebar
        product={product}
        quantity={quantity}
        selectedSize={selectedSize}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default CartContainer;
