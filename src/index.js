import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ErrorProvider } from './context/ErrorContext';
import { AuthProvider } from './context/AuthContext';
import {QueryClientProvider , QueryClient} from '@tanstack/react-query'
const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <ErrorProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </ErrorProvider>
  </QueryClientProvider>
);
