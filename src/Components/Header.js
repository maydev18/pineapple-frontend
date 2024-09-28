import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Header.module.css';
import logo from '../images/logo_name.png';
import logo_black from '../images/logo_black.png';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const sidebarVariants = {
  open: {
    x: 0,
    transition: {
      stiffness: 10,
      staggerChildren: 0.2,
    },
  },
  closed: {
    x: '-100%',
    transition: {
      stiffness: 5,
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { stiffness: 20 },
  },
  closed: {
    opacity: 0,
    x: -20,
    transition: { stiffness: 20 },
  },
};

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { openCart } = useCart();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const {isLoggedIn , login , logout} = useAuth();
  return (
    <>
      <header className={styles.header}>
        <div className={styles.menuIcon} onClick={toggleSidebar}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link to="/" className={styles.logoContainer}>
       
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
            
          </div>
         
        </Link>
        <div className={styles.navigationIcons}>
          {
            isLoggedIn ? (
              <div>
                <button className={styles.signinbutton}>
                 <div className={styles.signinbuttontext}>
                  <p> <strong>WELCOME</strong></p> 
                  <p>{localStorage.getItem('name')}</p>
                 </div>
                </button>
              </div>
            ) : (
              <>
              <button onClick={() => { login(); } } className={styles.signinbutton}>
                  <Icon icon="mdi:user" width="30" height="24" color= '#0E201D' On/>SIGN IN
                </button></>
            )
          }
          <div onClick={() => { openCart() }} className={styles.signinbutton}>
            <Icon icon="ic:baseline-shopping-bag" width="30" height="24" color='#0E201D' />CART
          </div>
        </div>
      </header>

      <motion.div
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}
        initial={sidebarOpen ? "open" : "closed"}
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <nav className={styles.sidebarNav}>
        
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
         
          <p style={{fontSize: '2rem', color: 'black', marginRight: '1rem'}} onClick={toggleSidebar}>X</p>
         
            </div>
            <img src={logo_black} alt='logo_black' />
          
            <motion.div variants={itemVariants}>
            <Link to="/" onClick={toggleSidebar} className={StyleSheet.linkStyle}>HOME</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/products" onClick={toggleSidebar} className={StyleSheet.linkStyle}>NEW ARRIVALS</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/orders" onClick={toggleSidebar} className={StyleSheet.linkStyle}>MY ORDERS</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/terms" onClick={toggleSidebar} className={StyleSheet.linkStyle}>POLICY AND TERMS</Link>
          </motion.div>
          {isLoggedIn && <motion.div variants={itemVariants}>
            <Link to = "#" onClick={() => {
              logout();
              toggleSidebar()
            }} className={StyleSheet.linkStyle}>LOG OUT</Link>
          </motion.div>
          }
         
        </nav>
      </motion.div>

      {sidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
};

export default Header;
