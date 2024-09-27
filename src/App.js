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
import EditProduct from './Components/admin/EditProduct';
import Inventory from './Components/admin/Inventory';
import ReturnPolicy from './pages/PolicyPage';
import Exchange from './Components/admin/Exchange';
import PrivateRoute from './router/PrivateRouter';
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
            path: ':productID',
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
            path : 'addproducts',
            element :  <AddProducts/>
          },
          {
            path : 'placedorder',
            element : <PlacedOrder />
          },
          {
            path : 'edit',
            element : <EditProduct/>
          },
          {
            path : 'inventory',
            element : <Inventory/>
          },
          {
            path : 'exchange',
            element : <Exchange/>
          }
        ]
      },
      {
        path: 'terms',
        element: <ReturnPolicy />,
      },
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}
export default App;
