import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Header.module.css';
import logo from '../images/logo_name.png';
import logo_black from '../images/logo_black.png';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AuthModal from '../Modal/AuthModal';
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const toggleAuthModal = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
  }
  const {isLoggedIn  , logout} = useAuth();
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
          {isLoggedIn ? (
           
              <div className={styles.userImageContainer}>
                <img
                  src={localStorage.getItem('photo')}
                  alt="User"
                  className={styles.userImage}
                />
              </div>
  
          ) : (
            <button 
            onClick={toggleAuthModal}
            className={styles.signinbutton}>
              <Icon icon="mdi:user" width="30" height="24" color='#0E201D' /> SIGN IN
            </button>
          )}

          <div className={styles.signinbutton}>
            <div onClick={() => { openCart() }} className={styles.cartIconContainer}>
              <Icon icon="ic:baseline-shopping-bag" width="30" height="24" color='#0E201D' />CART
            </div>
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
          
        <motion.div variants={itemVariants}>
          <p className={styles.closeButton} onClick={toggleSidebar}>
            <Icon icon="mdi:close" width="30" height="30" color="#0E201D" />
          </p>

          <div className={styles.sidebarLogo}>
            <img src={logo_black} alt='logo_black' />
          </div> 
          </motion.div>
          {isLoggedIn && (
            <motion.div variants={itemVariants}>
              <Link to="#" className={styles.linkStyle}>
                <div className={styles.userContainer}>
                  <div className={styles.userImageContainer}>
                    <img 
                      src={localStorage.getItem('photo')} 
                      alt="User" 
                      className={styles.userImage} 
                    />
                  </div>
                  <div>
                    <p className={styles.userName}>{localStorage.getItem('name')}</p>
                    <p className={styles.userDetails}>{localStorage.getItem('email')}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

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

          {isLoggedIn && (
            <>
              <motion.div variants={itemVariants}>
                <Link to="#" onClick={() => {
                  logout();
                  toggleSidebar();
                }} className={styles.linkStyle}>LOG OUT</Link>
              </motion.div>
             
            </>
          )}
           <motion.div variants={itemVariants}>
                <div className={styles.socialMediaIcons}>
                <a href="https://www.instagram.com/thepineapple.in_?igsh=MTg1azk5MTY1aXU0dQ==" target="_blank" rel="noopener noreferrer">
                  <Icon icon="mdi:instagram" width="30" height="30" color="#0E201D" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61555791567340&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                  <Icon icon="mdi:facebook" width="30" height="30" color="#0E201D" />
                </a>
              </div>
              </motion.div>
        </nav>
      </motion.div>
      <AuthModal isOpen={isAuthModalOpen} onClose={toggleAuthModal} /> 
      {sidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
};

export default Header;
