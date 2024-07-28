import React from 'react';
import CartItem from './CartItem'; // Assuming you use the same CartItem component for both cart and wishlist items
import classes from './WishListSidebar.module.css'; // Create a new CSS module for WishlistSidebar

const WishlistSidebar = ({ product, initialQuantity, selectedSize, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={classes.sidebar}>
      <button className={classes.closeButton} onClick={onClose}>X</button>
      <h2 className={classes.sidebarTitle}>Wishlist</h2>
      <div className={classes.cartItemsContainer}>
        <CartItem
          image={product.mainImage}
          size={selectedSize}
          initialQuantity={initialQuantity}
          price={product.price}
          title={product.title}
        />
      </div>
    </div>
  );
};

export default WishlistSidebar;
