import './App.css'
import UserMaster from './components/layout/user/UserMaster'
import Home from './components/pages/userpages/Home'
import About from './components/pages/userpages/About'
import Menu from './components/pages/userpages/Menu'
import Register from './components/pages/userpages/Register'
import Login from './components/pages/userpages/Login'
import Profile from './components/pages/userpages/Profile'
import PlaceOrder from './components/pages/userpages/PlaceOrder'
import CategoryMenu from './components/pages/userpages/CategoryMenu'
import Cart from './components/pages/userpages/Cart'
import OrderHistory from './components/pages/userpages/OrderHistory'
import AdminMaster from './components/layout/admin/AdminMaster'
import Dashboard from './components/pages/adminpages/Dashboard'
import ManageCategories from './components/pages/adminpages/ManageCategories'
import AddCategory from './components/pages/adminpages/AddCategory'
import EditCategory from './components/pages/adminpages/EditCategory'
import ManageMenus from './components/pages/adminpages/ManageMenus'
import AddMenu from './components/pages/adminpages/AddMenu'
import EditMenu from './components/pages/adminpages/EditMenu'
import ViewOrders from './components/pages/adminpages/ViewOrders'
import VerifyToken from './components/pages/adminpages/VerifyToken'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<UserMaster/>}>
            <Route index element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/place-order' element={<PlaceOrder/>}/>
            <Route path='/place-order/:categoryId' element={<CategoryMenu/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/order-history' element={<OrderHistory/>}/>

        </Route>

        <Route path='/admin' element={<AdminMaster/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='/admin/categories' element={<ManageCategories/>}/>
          <Route path='/admin/categories/add' element={<AddCategory/>}/>
          <Route path='/admin/categories/edit/:id' element={<EditCategory/>}/>
          <Route path='/admin/menus' element={<ManageMenus/>}/>
          <Route path='/admin/menus/add' element={<AddMenu/>}/>
          <Route path='/admin/menus/edit/:id' element={<EditMenu/>}/>
          <Route path='/admin/orders' element={<ViewOrders/>}/>
          <Route path='/admin/verify-token' element={<VerifyToken/>}/>
       </Route> 
       </Routes>
       </BrowserRouter>

       <ToastContainer position="top-right" autoClose={2000} />
    </>
  )
}

export default App
