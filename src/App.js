import {createBrowserRouter, RouterProvider } from 'react-router-dom';

import CartProvider from './Provider/CartContext'; // Ensure this import path is correct
import Checkout from './pages/Checkout';
import ProductPage from './pages/ProductPage';
import ProductView from './pages/ProductView';
import Hero from './pages/Hero';
import LoginPage from './pages/Login';
import SignupPage from './pages/SignUp';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
const router = createBrowserRouter([
  {
    path : '/',
    element : < RootLayout />,
    errorElement : <ErrorPage />,
    id : 'root',
    children : [
      {
        index : true,
        element : <Hero />
      },
      {
        path : 'login',
        element : <LoginPage />
      },
      {
        path : 'signup',
        element : <SignupPage />
      },
      {
        path : 'products',
        children : [
          {
            index : true,
            element : <ProductPage />,
          },
          {
            path : ':productID',
            element : <ProductView />
          }
        ]
      },
      {
        path : 'checkout',
        element : <Checkout />
      }
    ]
  }
])
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
