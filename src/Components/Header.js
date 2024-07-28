import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../images/logo_white.png';
import logo_black from '../images/logo_black.png';

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

      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <nav className={styles.sidebarNav}>
          <img src={logo_black} alt='logo_black' />
          <Link href="#home">HOME</Link>
          <Link href="#services">NEW ARRIVALS</Link>
          <Link href="#contact">RETURN</Link>
          <Link href="#contact">CUSTOMER SUPPORT</Link>
        </nav>
      </div>

      {sidebarOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </>
  );
};

export default Header;
