import Layoutt from "./Layoutt";
import Home from "../components/web/home/Home.jsx";
import Categories from "../components/web/categories/Categories.jsx";
import DashboardLayout from './DashboardLayout.jsx';
import Homedashboard from '../components/dashboard/home/Home.jsx'
import Categoriesdashboard from '../components/dashboard/categories/Categories.jsx'
import { createBrowserRouter,} from "react-router-dom";
import Register from "../components/web/register/Register.jsx";
import Loginn from "../components/web/loginn/Loginn.jsx";
import Cart from "../components/web/cart/Cart.jsx";
import CategoriesDetails from "../components/web/categories/CategoriesDetails.jsx";
import Product from "../components/web/products/Product.jsx";
import ProtectedRoute from "../components/web/protectedRoute/ProtectedRoute.jsx";
import SendCode from "../components/web/sendCode/SendCode.jsx";
import ForgotPassword from "../components/web/forgotPassword/ForgotPassword.jsx";
import Profile from "../components/web/profile/Profile.jsx";
import UserInfo from "../components/web/profile/UserInfo.jsx";
import UserContact from "../components/web/profile/UserContact.jsx";
import CreateOrder from "../components/web/orders/CreateOrder.jsx";
import GetOrder from "../components/web/orders/GetOrder.jsx"

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layoutt />,
      children:[
        {
          path:'register',
          element:<Register/>
        },
        {
  
          path:'login',
          element:<Loginn />
        },
        {
          // path:'/',
          index:true,
          element: <Home/>
        },
        {
          path: 'cart',
          element:
          <ProtectedRoute>
          <Cart/>
          </ProtectedRoute>
        },{
          path:'sendcode',
          element:<SendCode/>
        },{
          path:'forgotPassword',
          element:<ForgotPassword/>
        },{

          path:'profile',
          element:
          <ProtectedRoute><Profile/></ProtectedRoute>,
          children:[
            {
           index:true,
             element:<UserInfo/>

            },
            {path:'order',
             element:<GetOrder/>},
            {
              path:'contact',
              element:<UserContact/>
 
             }
          ]
        },{
          path:'createOrder',
          element:<CreateOrder/>
        }
        ,
        {
          path:'products/category/:categoryId',
          element:<CategoriesDetails/>
        },
        {
          path:'products/:productId',
          element:<Product/>
        },
        {
          path:'categories',
          element: <Categories/>
        },
        {
          path:'*',
          element: <h2>page not found ---user</h2>
        }
      ]
    },
    {
      path: "/dashboard",
      element:<DashboardLayout/>,
      children:[
        {
          path:'home',
          element: <Homedashboard/>
        },
        {
          path:'categories',
          element: <Categoriesdashboard/>
        },
        {
          path:'*',
          element: <h2>page not found ---admin</h2>
        }
      ]
    },
   
  ]);