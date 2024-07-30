import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Header.module.css';
import logo from '../images/logo_name.png';
import logo_black from '../images/logo_black.png';

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

const Header = ({ onOpenCart }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <Link to="/">
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
          </div>
        </Link>
        <div className={styles.navigationIcons}>
          <Link to="auth?mode=login">
            <Icon icon="ic:baseline-person-outline" width="24" height="24" color='white' />
          </Link>
          <Link to="#search">
            <Icon icon="ic:baseline-search" width="24" height="24" color='white' />
          </Link>
          <Link to="#favorite">
            <Icon icon="ic:baseline-favorite-border" width="24" height="24" color='white' />
          </Link>
          <Link onClick={onOpenCart}>
            <Icon icon="ic:baseline-shopping-bag" width="24" height="24" color='white' />
          </Link>
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
          <motion.div variants={itemVariants}><Link to="#contact">MY ORDERS</Link></motion.div>
          <motion.div variants={itemVariants}><Link to="#contact">RETURN</Link></motion.div>
          <motion.div variants={itemVariants}><Link to="#contact">CUSTOMER SUPPORT</Link></motion.div>
        </nav>
      </motion.div>

      {sidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
};

export default Header;
