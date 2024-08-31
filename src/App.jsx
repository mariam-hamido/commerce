
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Register from './components/Register/Register';
import Category from './components/Category/Category';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Error from './components/Error/Error';
import  UserContextProvider  from './Context/UserContext';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from './components/CheckOut/CheckOut';
import MyOrders from './components/MyOrders/MyOrders';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifiyCode from './components/VerifiyCode/VerifiyCode';
import ResetAccount from './components/ResetAccount/ResetAccount';






function App() {
 
const router=  createBrowserRouter([
    {
      path:"",
      element:<Layout/>,
      errorElement:<Error/>,
      children:[
        {
          index:true,
          element:<ProtectedRoute>
          <Home/>
          </ProtectedRoute>
          
          
        },
        {
          path:"/Products",
          element:<ProtectedRoute>
          <Products/>
          </ProtectedRoute>
          
        },
        {
          path:"/checkout",
          element:<ProtectedRoute>
          <CheckOut/>
          </ProtectedRoute>
          
        },
        {
          path:"/allOrders",
          element:<ProtectedRoute>
          <MyOrders/>
          </ProtectedRoute>
          
        },
        {
          path:"/Product-details/:id/:category",
          element:<ProtectedRoute>
          <ProductDetails/>
          </ProtectedRoute>
          
        },
        {
          path:"/Cart",
          element:<ProtectedRoute>
          <Cart/>
          </ProtectedRoute>
        
        },
        {
          path:"/Brands",
          element:<ProtectedRoute>
          <Brands/>
          </ProtectedRoute>
          
          
        },
        {
          path:"/Category",
          element:<ProtectedRoute>
          <Category/>
          </ProtectedRoute>
          
        },
        {
          path:"/Register",
          element:<Register/>
        },
        {
          path:"/Login",
          element:<Login/>
        },
        {
          path:"/commerce",
          element:<Login/>
        },
        {
          path:"/Forget-password",
          element:
          <ForgetPassword/>
        },
        {
          path:"/verify-code",
          element:
          <VerifiyCode/>
        },
        {
          path:"/Reset-password",
          element:
          <ResetAccount/>
        },
        {
          path:"*",
          element:<NotFound/>
        }
      ]
    }
])
  return <UserContextProvider>
           <CartContextProvider>
              <RouterProvider router={router}/>
              <ToastContainer/>
           </CartContextProvider>
         </UserContextProvider>
    
  
}

export default App
