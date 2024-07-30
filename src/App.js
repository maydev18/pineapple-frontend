import {createBrowserRouter, RouterProvider } from 'react-router-dom';

import CartProvider from './Provider/CartContext'; // Ensure this import path is correct
import Checkout from './pages/Checkout';
import ProductPage from './pages/ProductPage';
import ProductView from './pages/ProductView';
import Hero from './Components/Home';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import CombinedAuthPage from './pages/CombinedAuthPage';
import {action as AuthAction} from './pages/CombinedAuthPage';
import {tokenLoader , checkAuthLoader} from './utils/Auth';
import {action as logoutAction} from './pages/logout';
import {loader as ProductsLoader} from './pages/ProductPage';
import {loader as ProductLoader , action as ReviewAction} from './pages/ProductView';
import {loader as TopProductsLoader} from './Components/Home';
const router = createBrowserRouter([
  {
    path : '/',
    element : < RootLayout />,
    errorElement : <ErrorPage />,
    id : 'root',
    loader : tokenLoader,
    children : [
      {
        index : true,
        element : <Hero />,
        loader : TopProductsLoader
      },
      {
        path : 'auth',
        element : <CombinedAuthPage />,
        action : AuthAction
      },
      {
        path : 'products',
        children : [
          {
            index : true,
            element : <ProductPage />,
            loader : ProductsLoader
          },
          {
            path : ':productID',
            element : <ProductView />,
            loader : ProductLoader,
            action : ReviewAction
          }
        ]
      },
      {
        path : 'checkout',
        element : <Checkout />
      },
      {
        path : 'logout',
        action : logoutAction
      }
    ]
  }
])
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
