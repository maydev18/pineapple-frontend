import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import '../index.css';
import logo from '../images/logo_white.png'; // Make sure to import your logo image

const Header = () => {
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
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navigation-icons">
          <a href="#login"><Icon icon="ic:baseline-person-outline" width="24" height="24" /></a>
          <a href="#search"><Icon icon="ic:baseline-search" width="24" height="24" /></a>
          <a href="#favorite"><Icon icon="ic:baseline-favorite-border" width="24" height="24" /></a>
          <a href="#bag"><Icon icon="ic:baseline-shopping-bag" width="24" height="24" /></a>
        </div>
      </header>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Header;
