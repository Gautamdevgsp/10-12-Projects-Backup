import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import UserLayout from "./components/layout/user/UserLayout";
import AdminLayout from "./components/layout/admin/AdminLayout";

import Home from "./components/pages/userpages/Home";
import Login from "./components/pages/userpages/Login";
import Register from "./components/pages/userpages/Register";
import BrowseCategories from "./components/pages/userpages/BrowseCategories";
import BrowseArtworks from "./components/pages/userpages/BrowseArtworks";
import ArtworkDetail from "./components/pages/userpages/ArtworkDetail";
import CustomPainting from "./components/pages/userpages/CustomPainting";
import MyOrders from "./components/pages/userpages/MyOrders";
import MyCustomRequests from "./components/pages/userpages/MyCustomRequests";
import Profile from "./components/pages/userpages/Profile";

import Dashboard from "./components/pages/adminpages/Dashboard";
import ManageCategories from "./components/pages/adminpages/ManageCategories";
import AddCategory from "./components/pages/adminpages/AddCategory";
import EditCategory from "./components/pages/adminpages/EditCategory";
import ManageArtworks from "./components/pages/adminpages/ManageArtworks";
import AddArtwork from "./components/pages/adminpages/AddArtwork";
import EditArtwork from "./components/pages/adminpages/EditArtwork";
import ManageCustomRequests from "./components/pages/adminpages/ManageCustomRequests";
import ManageOrders from "./components/pages/adminpages/ManageOrders";
import ManageReviews from "./components/pages/adminpages/ManageReviews";
import ManageUsers from "./components/pages/adminpages/ManageUsers";
import AdminProfile from "./components/pages/adminpages/AdminProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories" element={<BrowseCategories />} />
            <Route path="/artworks" element={<BrowseArtworks />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            <Route path="/custom-painting" element={<CustomPainting />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/my-requests" element={<MyCustomRequests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Home />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<ManageCategories />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="edit-category/:id" element={<EditCategory />} />
            <Route path="artworks" element={<ManageArtworks />} />
            <Route path="add-artwork" element={<AddArtwork />} />
            <Route path="edit-artwork/:id" element={<EditArtwork />} />
            <Route path="custom-requests" element={<ManageCustomRequests />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="reviews" element={<ManageReviews />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
export default App;
