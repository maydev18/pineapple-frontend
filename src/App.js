
import { useState, useEffect } from 'react';
import './App.css';
import Modal from './Modal/Modal';
import modalImage from './images/banner.jpg'; // Replace with your modal image path
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Components/Checkout';
import Hero from './Components/Hero'
import ProductView from './Components/ProductView';
import ProductPage from './Components/ProductPage';
import LoginPage from './Components/Login';
import SignupPage from './Components/SignUp';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <><div className="App">
      {/* <Modal isOpen={isModalOpen} onClose={handleCloseModal} imageSrc={modalImage} /> */}
      <Router>
        <Routes><Route path="/" element={<Hero />} /></Routes></Router>
    </div>
    <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/productsView" element={<ProductView />} />
          <Route path="/productspage" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router></>
  );
}

export default App;

