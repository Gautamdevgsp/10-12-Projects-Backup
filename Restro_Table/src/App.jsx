import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import UserMaster from "./components/layout/user/UserMaster";
import AdminMaster from "./components/layout/admin/AdminMaster";

import Home from "./components/pages/userpages/Home";
import Login from "./components/pages/userpages/Login";
import Register from "./components/pages/userpages/Register";
import Categories from "./components/pages/userpages/Categories";
import Menu from "./components/pages/userpages/Menu";
import PlaceOrder from "./components/pages/userpages/PlaceOrder";
import OrderStatus from "./components/pages/userpages/OrderStatus";
import OrderHistory from "./components/pages/userpages/OrderHistory";
import Profile from "./components/pages/userpages/Profile";

import Dashboard from "./components/pages/adminpages/Dashboard";
import ManageCategories from "./components/pages/adminpages/ManageCategories";
import AddCategory from "./components/pages/adminpages/AddCategory";
import EditCategory from "./components/pages/adminpages/EditCategory";
import ManageMenu from "./components/pages/adminpages/ManageMenu";
import AddMenu from "./components/pages/adminpages/AddMenu";
import EditMenu from "./components/pages/adminpages/EditMenu";
import ViewOrders from "./components/pages/adminpages/ViewOrders";
import ManageUsers from "./components/pages/adminpages/ManageUsers";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserMaster />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/tables" element={<Menu />} />
            <Route path="/book-table/:id" element={<PlaceOrder />} />
            <Route path="/my-bookings" element={<OrderStatus />} />
            <Route path="/booking-history" element={<OrderHistory />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/admin" element={<AdminMaster />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/categories" element={<ManageCategories />} />
            <Route path="/admin/categories/add" element={<AddCategory />} />
            <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
            <Route path="/admin/tables" element={<ManageMenu />} />
            <Route path="/admin/tables/add" element={<AddMenu />} />
            <Route path="/admin/tables/edit/:id" element={<EditMenu />} />
            <Route path="/admin/bookings" element={<ViewOrders />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
export default App;
