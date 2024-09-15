import {useState } from 'react';
import classes from './CartItem.module.css';
import { Spinner } from 'react-bootstrap';
import { getFullSize } from '../utils/cartUtils/convertSize';
import { useCart } from '../context/CartContext';
const CartItem = ({ id , image, size, quantity, price, title , checkout}) => {
  const {addToCart , deleteFromCart} = useCart();
  const [isAddSubmitting, setIsAddSubmitting] = useState(false);
  const [isRemoveSubmitting, setIsRemoveSubmitting] = useState(false);

  const handleIncrease =async () => {
    setIsAddSubmitting(true);
    await addToCart(id , getFullSize(size));
    setIsAddSubmitting(false);
  };

  const handleDecrease = async () => {
    setIsRemoveSubmitting(true);
    await deleteFromCart(id , getFullSize(size));
    setIsRemoveSubmitting(false);
  };

  return (
    <><div className={classes.cartItem}>
      <img src={image} alt="Product" className={classes.cartItemImage} />
      <div className={classes.cartItemDetails}>
        <h2>{title}</h2>
        <h4><span>Size:</span> {size}</h4>
        <h4><span>Price: </span>INR {price * quantity}</h4>
        {checkout && <h4><span>Quantity: </span>{quantity}</h4>}
        {!checkout && <div className={classes.quantityBar}>
          <div className={classes.quantity}>
            <button className={classes.quantityButton} onClick={handleDecrease}>{isRemoveSubmitting ? <Spinner animation="border" /> : '-'}</button>
            <input type="number" className={classes.quantityInput} value={quantity} readOnly />
            <button className={classes.quantityButton} onClick={handleIncrease}>{isAddSubmitting ? <Spinner animation="border" /> : '+'}</button>
          </div>
        </div>}

      </div>

    </div><hr /></>
    
  );
};

export default CartItem;
