import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import logo_black from '../images/logo_black.png';
import styles from './Header.module.css'; // Assuming you have a separate CSS file
import { useAuth } from '../context/AuthContext';

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

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <>
      <motion.div
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}
        initial={sidebarOpen ? 'open' : 'closed'}
        animate={sidebarOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
      >
        <nav className={styles.sidebarNav}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p style={{ fontSize: '2rem', color: 'black', marginRight: '1rem' }} onClick={toggleSidebar}>
              X
            </p>
          </div>
          <img src={logo_black} alt="logo_black" className={styles.logo} />
          
          <motion.div variants={itemVariants}>
            <Link to="/" onClick={toggleSidebar} className={styles.linkStyle}>HOME</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/products" onClick={toggleSidebar} className={styles.linkStyle}>NEW ARRIVALS</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/orders" onClick={toggleSidebar} className={styles.linkStyle}>MY ORDERS</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link to="/terms" onClick={toggleSidebar} className={styles.linkStyle}>POLICY AND TERMS</Link>
          </motion.div>

          {/* Display user information if logged in */}
          {isLoggedIn && user && (
            <motion.div variants={itemVariants} className={styles.userInfo}>
              <img
                src={user.image || 'https://placehold.co/600x400'}
                alt="User"
                className={styles.userImage}
              />
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userDetails}>{user.email}</p>
              <p className={styles.userDetails}>{user.phone}</p>
              <Link
                to="#"
                onClick={() => {
                  logout();
                  toggleSidebar();
                }}
                className={styles.linkStyle}
              >
                LOG OUT
              </Link>
            </motion.div>
          )}
        </nav>
      </motion.div>

      {/* Overlay to close sidebar */}
      {sidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
