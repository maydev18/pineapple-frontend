import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './pages/Checkout/Checkout';
import ProductPage from './pages/ProductPage';
import ProductView from './pages/ProductView';
import Hero from './Components/Home';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import {loader as ProductLoader} from './pages/ProductView';
import {loader as TopProductsLoader} from './Components/Home';
import Orderspage from './Components/Orderspage';
import Dashboard from './Components/admin/Dashboard';
import AddProducts from './Components/admin/AddProducts';
import PlacedOrder from './Components/admin/PlacedOrders';
import Inventory from './Components/admin/Inventory';
import ReturnPolicy from './pages/PolicyPage';
import Exchange from './Components/admin/Exchange';
import PrivateRoute from './router/PrivateRouter';
import AboutUsPage from './pages/AboutUsPage';
import { useEffect } from 'react';
import { initGA , trackPageView} from './analytics';
import { useLocation } from 'react-router-dom';
import {saveUTMParams} from "./utils/utm";
export const router = createBrowserRouter([
  {
    path : '/',
    element : < RootLayout />,
    errorElement : <ErrorPage />,
    id : 'root',
    children : [
      {
        index: true,
        element: <Hero />,
        loader: TopProductsLoader,
      },
      {
        path : 'products',
        children : [
          {
            index: true,
            element: <ProductPage />,
          },
          {
            path: ':productName',
            element: <ProductView />,
            loader: ProductLoader,
          },
        ],
      },
      {
        element : <PrivateRoute/>,
        children : [
          {
            path : 'checkout',
            element : <Checkout />
          },
          {
            path : 'orders',
            element : <Orderspage/>
          }
        ]
      },
      {
        path : 'admin',
        element : <PrivateRoute />,
        children : [
          {
            index : true,
            element : <Dashboard />
          },
          {
            path : 'product/:productName/:token',
            element : <ProductView />,
            loader: ProductLoader,
          },
          {
            path : 'addproducts',
            element :  <AddProducts/>
          },
          {
            path : 'placedorder',
            element : <PlacedOrder />
          },
          {
            path : 'inventory',
            element : <Inventory/>
          },
          {
            path : 'exchange',
            element : <Exchange/>
          },
          
        ]
      },
      {
        path: 'terms',
        element: <ReturnPolicy />,
      },
      {
        path : 'about',
        element : <AboutUsPage/>
      }
    ]
  }
]);

function GAListener() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);


  return null;
}
function App() {
  useEffect(() => {
    saveUTMParams();
    initGA();
  } , []);
  return (
    <>
      <RouterProvider router={router}>
        <GAListener />
      </RouterProvider>
    </>
  );
}
export default App;
