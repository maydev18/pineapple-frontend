// Header.js
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import './Header.css';
import logo from '../images/logo_white.png';
import logo_black from '../images/logo_black.png';
import { Link } from 'react-router-dom';

const Header = ({ onOpenCart }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <header className="header">
        <div className="menu-icon" onClick={toggleSidebar}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </Link>
        <div className="navigation-icons">
          <Link to="login"><Icon icon="ic:baseline-person-outline" width="24" height="24" color='white'/></Link>
          <Link to="#search"><Icon icon="ic:baseline-search" width="24" height="24" color='white'/></Link>
          <Link to="#favorite"><Icon icon="ic:baseline-favorite-border" width="24" height="24" color='white'/></Link>
          <Link onClick={onOpenCart}><Icon icon="ic:baseline-shopping-bag" width="24" height="24" color='white'/></Link>
        </div>
      </header>
     
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav>
          <img src={logo_black} alt='logo_black'/>
          <Link to="#home">Home</Link>
          <Link to="#services">Services</Link>
          <Link to="#contact">Contact</Link>
        </nav>
      </div>
     
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Header;
