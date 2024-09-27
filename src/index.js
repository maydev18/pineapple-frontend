import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ErrorProvider } from './context/ErrorContext';
import { AuthProvider } from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <ErrorProvider>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </ErrorProvider>
);
