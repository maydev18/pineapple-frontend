import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import styles from './CartSideBar.module.css';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { getsize } from '../utils/cartUtils/convertSize';

const CartSidebar = () => {
  const {cart , isOpen , closeCart} = useContext(CartContext);
  return (
    <div className={`${styles.cartSidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={() => {closeCart()}}>X</button>
      <h1 className={styles.cartHeading}>Cart</h1>
      <hr />
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((product, index) => (
            <CartItem
              key={index}
              image={product.productID.mainImage}
              size={getsize(product.size)}
              quantity={product.quantity}
              price={product.productID.price}
              title={product.productID.title}
              id={product.productID._id}
              checkout={false}
            />
          ))}
          <div className={styles.proceedbutton}>
            <Link to='/checkout'>
              <button className={styles.checkoutButton} style={{textDecoration: "none"}}>
                Proceed to Payment
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};


export default CartSidebar;
