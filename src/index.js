import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ErrorProvider } from './context/ErrorContext';
import { AuthProvider } from './context/AuthContext';
import { Auth0ProviderWithNavigate } from './context/Auth0ProviderWithNavigate';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Auth0ProviderWithNavigate >
    <ErrorProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ErrorProvider>
    </Auth0ProviderWithNavigate>
);
