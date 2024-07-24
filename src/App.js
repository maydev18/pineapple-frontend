// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartProvider from './Provider/CartContext'; // Ensure this import path is correct
import Checkout from './pages/Checkout';
import ProductPage from './pages/ProductPage';
import ProductView from './pages/ProductView';
import Hero from './pages/Hero';
import LoginPage from './pages/Login';
import SignupPage from './pages/SignUp';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/productspage" element={<ProductPage />} />
          <Route path="/productsView" element={<ProductView />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
