import React from 'react';
import WishlistItem from './WishListItem'; // Ensure correct import of WishlistItem component
import classes from './WishListSidebar.module.css'; // Create a new CSS module for WishlistSidebar

const WishlistSidebar = ({ products = [], isOpen, onClose, onAddToCart }) => {
  if (!isOpen) return null;

  return (
    <div className={classes.sidebar}>
      <button className={classes.closeButton} onClick={onClose}>X</button>
      <h2 className={classes.sidebarTitle}>Wishlist</h2>
      <div className={classes.wishlistItemsContainer}>
        {products.map((product) => (
          <WishlistItem
            key={product.id}
            image={product.mainImage}
            size={product.selectedSize}
            price={product.price}
            color={product.color}
            title={product.title}
            onAddToCart={() => onAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistSidebar;
