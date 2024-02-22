import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.min.css'

// import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './customer/pages/User/User';
import UserAuth from './customer/app/contextapi/UserContext';
import NavBar from './customer/pages/NavBar/NavBar'
import Login from './customer/pages/Authorization/Login/Login'
import SignUp from './customer/pages/Authorization/SignUp/SignUp';
import Seller from './customer/pages/Authorization/Seller/Seller';
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/Product/Product';
import Cart from './customer/pages/Cart/Cart'
import Order from './customer/pages/Orders/Order';
import Checkout from './customer/pages/Checkout/Checkout'



import DashBoard from './admin/pages/dashboard/index';
import ProductsAdmin from './admin/pages/products';
import UsersAdmin from './admin/pages/users';
import SellersAdmin from './admin/pages/sellers';
import ShopsAdmin from './admin/pages/shops';
import OrdersAdmin from './admin/pages/orders';
import AdminLogin from './admin/pages/loginpage';
import AdminAuth from './admin/contextapi/AdminContext';
import CategoryAdmin from './admin/pages/category/index'


import SellerAuth from './seller/app/providers/SellerContext';
import HomeSeller from './seller/pages/dashboardPage';
import SellerLogin from './seller/pages/loginPage';
import SellerOrders from './seller/pages/orders';
import ListingsSeller from './seller/pages/Listings';
import SellerListings from './seller/pages/Listings';
import AddShop from './seller/pages/shop/addShop';
import AddListing from './seller/pages/Listings/addListing';
import SingleOrder from './customer/pages/Orders/singleOrder/SingleOrder';
import Address from './customer/pages/User/Address';
import SavedCards from './customer/pages/User/SavedCards';
import Vouchers from './customer/pages/User/Voucher';
import CategoryCustomer from './customer/pages/Product/Category';
import CategoryProducts from './customer/pages/Product/CategoryProducts';


function App ()
{



  return (
    <div className="">

      <BrowserRouter>

        <Routes>
          {/* <UserAuth>
          <NavBar> */}
          <Route exact path="/login" element={ <UserAuth><NavBar children={ <Login /> } /></UserAuth> } />
          <Route exact path="/" element={ <UserAuth><NavBar children={ <Home /> } /></UserAuth> } />
          <Route exact path="/user" >
            <Route index element={<UserAuth children={<NavBar children={<User/>}/>}/>}/>
            <Route path="vouchers" element={<UserAuth children={<NavBar children={<Vouchers/>}/>}/>}/>
            <Route path="address" element={<UserAuth children={<NavBar children={<Address/>}/>}/>}/>
            <Route path="savedcards" element={<UserAuth children={<NavBar children={<SavedCards/>}/>}/>}/>
          </Route>
          <Route exact path="/user/orders" element={ <UserAuth children={ <NavBar children={ <Order /> } /> } /> } />
          <Route exact path="/signup" element={ <UserAuth children={ <NavBar children={ <SignUp /> } /> } /> } />
          <Route exact path="/seller" element={ <UserAuth children={ <NavBar children={ <Seller /> } /> } /> } />
          <Route exact path="/product/:productId" element={ <UserAuth children={ <NavBar children={ <Product /> } /> } /> } />
          <Route exact path="/cart" element={ <UserAuth children={ <NavBar children={ <Cart /> } /> } /> } />
          <Route exact path="/checkout" element={ <UserAuth children={ <NavBar children={ <Checkout/> } /> } /> } />
          <Route exact path="/orders/:orderId" element={ <UserAuth children={ <NavBar children={ <SingleOrder /> } /> } /> } />
          <Route exact path="/category/:categoryId" element={ <UserAuth children={ <NavBar children={ <CategoryCustomer /> } /> } /> } />
          <Route exact path="/product/all/:categoryId" element={ <UserAuth children={ <NavBar children={ <CategoryProducts /> } /> } /> } />
          

              //Seller Routes
          <Route path='/seller'>
            <Route index element={ <SellerAuth children={ <HomeSeller /> } /> } />
            <Route path='login' element={ <SellerLogin /> } />
            <Route path="orders" element={ <SellerAuth children={ <SellerOrders /> } /> } />
            <Route path='listings' element={ <SellerAuth children={ <SellerListings /> } /> } />
            <Route path='shop/add' element={<SellerAuth children={<AddShop/>}/>}/>
            <Route path="listings/add" element={<SellerAuth children={<AddListing/>}/>}/>
          </Route>

              ///Admin Routes
          <Route path="/admin"  >
            <Route index element={ <AdminAuth children={ <DashBoard /> } /> } />
            <Route path="products" element={ <AdminAuth children={ <ProductsAdmin /> } /> } />
            <Route path="users" element={ <AdminAuth children={ <UsersAdmin /> } /> } />
            <Route path="sellers" element={ <AdminAuth children={ <SellersAdmin /> } /> } />
            <Route path='shops' element={ <AdminAuth children={ <ShopsAdmin /> } /> } />
            <Route path='orders' element={ <AdminAuth children={ <OrdersAdmin /> } /> } />
            <Route path='login' element={ <AdminAuth children={ <AdminLogin /> } /> } />
            <Route path='category' element={ <AdminAuth children={ <CategoryAdmin /> } /> } />
            <Route path='category/add' element={ <AdminAuth children={ <CategoryAdmin /> } /> } />


          </Route>

        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;





// import logo from './logo.svg';
// import './App.css';

// import 'antd/dist/antd.min.css'

// // import { useEffect } from 'react';
// import { Provider } from 'react-redux';
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import User from './customer/pages/User/User';
// import UserAuth from './customer/app/contextapi/UserContext';
// import NavBar from './customer/pages/NavBar/NavBar'
// import Login from './customer/pages/Authorization/Login/Login'
// import SignUp from './customer/pages/Authorization/SignUp/SignUp';
// import Shop from './customer/pages/Shops/Shops'
// import SingleShop from './customer/pages/Shops/SingleShop'
// import Home from './customer/pages/Home/Home';
// import Product from './customer/pages/Product/Product';
// import Cart from './customer/pages/Cart/Cart'
// import Order from './customer/pages/Orders/Order';
// import ShopOrders from './customer/pages/Shops/ShopOrders';



// import DashBoard from './admin/pages/dashboard/index';
// import ProductsAdmin from './admin/pages/products';
// import UsersAdmin from './admin/pages/users';
// import SellersAdmin from './admin/pages/sellers';
// import ShopsAdmin from './admin/pages/shops';
// import OrdersAdmin from './admin/pages/orders';
// import AdminLogin from './admin/pages/loginpage';
// import AdminAuth from './admin/contextapi/AdminContext';



// function App() {



//   return (
//     <div className="">

//       <BrowserRouter>
        
//             <Routes>
//             {/* <UserAuth>
//           <NavBar> */}
//               <Route exact path="/login" element={<UserAuth><NavBar children={<Login />}/></UserAuth>} />
//               <Route exact path="/" element={<UserAuth><NavBar children={<Home />}/></UserAuth>} />
//               <Route exact path="/user" element={<UserAuth><NavBar children={<User />}/></UserAuth>} />
//               <Route exact path="/user/orders" element={<UserAuth children={<NavBar children={<Order />}/>}/>} />
//               <Route exact path="/signup" element={<UserAuth children={<NavBar children={<SignUp />}/>}/>} />
             
//               <Route exact path="/user/myshops" element={<UserAuth children={<NavBar children={<Shop />}/>}/>} />
//               <Route exact path="/user/myshops/:shopId" element={<UserAuth children={<NavBar children={<SingleShop />}/>}/>} />
//               <Route exact path="/user/myshops/:shopId/orders" element={<UserAuth children={<NavBar children={<ShopOrders />}/>}/>} />
//               <Route exact path="/product/:productId" element={<UserAuth children={<NavBar children={<Product />}/>}/>} />
//               <Route exact path="/cart" element={<UserAuth children={<NavBar children={<Cart />}/>}/>} />

           

//               ///Admin Routes
//               <Route  path="/admin"  >
//                 <Route index element={<AdminAuth children={<DashBoard/>}/>}/>
//                 <Route path="products"  element={<AdminAuth children={<ProductsAdmin/>}/>}/>
//                 <Route path="users" element={<AdminAuth children={<UsersAdmin/>}/>}/>
//                 <Route path="sellers" element={<AdminAuth children={<SellersAdmin/>}/>}/>
//                 <Route path='shops' element={<AdminAuth children={<ShopsAdmin/>}/>}/>
//                 <Route path='orders' element={<AdminAuth children={<OrdersAdmin/>}/>}/>
//                 <Route path='login' element={<AdminAuth children={<AdminLogin/>}/>}/>
//               </Route>

//             </Routes>
          
//       </BrowserRouter>


//     </div>
//   );
// }

// export default App;
