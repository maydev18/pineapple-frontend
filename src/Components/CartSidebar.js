import styles from './CartSideBar.module.css';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { getsize } from '../utils/cartUtils/convertSize';
import { useCart } from '../context/CartContext';

const CartSidebar = () => {
  const {cart , isOpen , closeCart} = useCart();
  return (
    <>
      {isOpen && <div className={styles.underlay} onClick={closeCart}></div>}
      <div className={`${styles.cartSidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={() => {closeCart()}}>X</button>
        <h1 className={styles.cartHeading}>Cart</h1>
        <hr />
        {cart.length === 0 ? (
          <><p style={{ color: "black", textAlign: 'center', fontSize: '20px'}}>Your cart is empty :(</p><button onClick={() => closeCart()} className={styles.cartButton}><Link to='/products' className={styles.cartbuttontext}>Continue Shopping</Link></button></>
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
                <button className={styles.checkoutButton} style={{textDecoration: "none"}} onClick={() => closeCart()}>
                  Proceed to Payment
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};


export default CartSidebar;
