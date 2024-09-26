import { useContext, useState } from 'react';
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
      stiffness: 20,
      staggerChildren: 0.2,
    },
  },
  closed: {
    x: '-100%',
    transition: {
      stiffness: 20,
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
  const {Logout , login , isLoggedIn} = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
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
            !isLoggedIn ? (
              <Link onClick={() => { login() }}>
                <Icon icon="ic:baseline-person-outline" width="30" height="30" color='white' />
              </Link>
            ) : (
              <Link onClick={() => {Logout()}}>
                Logout
              </Link>
            )
          }
          <div onClick={() => { openCart() }} style={{ cursor: "pointer" }}>
            <Icon icon="ic:baseline-shopping-bag" width="30" height="30" color='white' />
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
          <img src={logo_black} alt='logo_black' />
          <motion.div variants={itemVariants}><Link to="/">HOME</Link></motion.div>
          <motion.div variants={itemVariants}><Link to="/products">NEW ARRIVALS</Link></motion.div>
          <motion.div variants={itemVariants}><Link to="/orders">MY ORDERS</Link></motion.div>
          <motion.div variants={itemVariants}><Link to="/terms">POLICY AND TERMS</Link></motion.div>

        </nav>
      </motion.div>

      {sidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
};

export default Header;
