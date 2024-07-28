// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartProvider from './Provider/CartContext'; // Ensure this import path is correct
import Checkout from './pages/Checkout';
import ProductPage from './pages/ProductPage';
import ProductView from './pages/ProductView';
import Hero from './Components/Home';
import CombinedAuthPage from './pages/CombinedAuthPage';



function App() {
  return (
    <Router>
       <Routes>
      <Route path="/login" element={<CombinedAuthPage isSignup={false} />} />
      <Route path="/signup" element={<CombinedAuthPage isSignup={true} />} />
      <Route path='/' element={<Hero/>}/>
        <Route path="/productspage" element={<ProductPage />} />
          <Route path="/productsView" element={<ProductView />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login"></Route>
      </Routes>
      
    </Router>
   
  );
}

export default App;
