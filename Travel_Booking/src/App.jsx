import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import UserMaster from "./components/layouts/user/UserMaster";
import AdminMaster from "./components/layouts/admin/AdminMaster";

import Home from "./components/pages/userpages/Home";
import About from "./components/pages/userpages/About";
import Register from "./components/pages/userpages/Register";
import Login from "./components/pages/userpages/Login";
import Categories from "./components/pages/userpages/Categories";
import Packages from "./components/pages/userpages/Packages";
import PackageDetail from "./components/pages/userpages/PackageDetail";
import BookingStatus from "./components/pages/userpages/BookingStatus";
import PackageRequest from "./components/pages/userpages/PackageRequest";
import MyRequests from "./components/pages/userpages/MyRequests";
import BookingHistory from "./components/pages/userpages/BookingHistory";
import Profile from "./components/pages/userpages/Profile";
import AiTravelPlanner from "./components/pages/userpages/AiTravelPlanner";

import Dashboard from "./components/pages/adminpages/Dashboard";
import ManageCategories from "./components/pages/adminpages/ManageCategories";
import AddCategory from "./components/pages/adminpages/AddCategory";
import EditCategory from "./components/pages/adminpages/EditCategory";
import ManagePackages from "./components/pages/adminpages/ManagePackages";
import AddPackage from "./components/pages/adminpages/AddPackage";
import EditPackage from "./components/pages/adminpages/EditPackage";
import ViewBookings from "./components/pages/adminpages/ViewBookings";
import PackageRequests from "./components/pages/adminpages/PackageRequests";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserMaster />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/package-detail/:id" element={<PackageDetail />} />
            <Route path="/booking-status" element={<BookingStatus />} />
            <Route path="/package-request" element={<PackageRequest />} />
            <Route path="/my-requests" element={<MyRequests />} />
            <Route path="/booking-history" element={<BookingHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ai-travel-planner" element={<AiTravelPlanner />} />
          </Route>

          <Route path="/admin" element={<AdminMaster />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/categories" element={<ManageCategories />} />
            <Route path="/admin/categories/add" element={<AddCategory />} />
            <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
            <Route path="/admin/packages" element={<ManagePackages />} />
            <Route path="/admin/packages/add" element={<AddPackage />} />
            <Route path="/admin/packages/edit/:id" element={<EditPackage />} />
            <Route path="/admin/bookings" element={<ViewBookings />} />
            <Route path="/admin/package-requests" element={<PackageRequests />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
