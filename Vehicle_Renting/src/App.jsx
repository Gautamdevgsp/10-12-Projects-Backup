import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserMaster from "./components/layouts/user/UserMaster";
import AdminMaster from "./components/layouts/admin/AdminMaster";

import Home from "./components/pages/userpages/Home";
import Register from "./components/pages/userpages/Register";
import Login from "./components/pages/userpages/Login";
import Categories from "./components/pages/userpages/Categories";
import Vehicles from "./components/pages/userpages/Vehicles";
import VehicleDetail from "./components/pages/userpages/VehicleDetail";
import RequestStatus from "./components/pages/userpages/RequestStatus";
import RentalHistory from "./components/pages/userpages/RentalHistory";
import MakePayment from "./components/pages/userpages/MakePayment";
import Profile from "./components/pages/userpages/Profile";

import Dashboard from "./components/pages/adminpages/Dashboard";
import ManageCategory from "./components/pages/adminpages/ManageCategory";
import AddCategory from "./components/pages/adminpages/AddCategory";
import EditCategory from "./components/pages/adminpages/EditCategory";
import ManageVehicle from "./components/pages/adminpages/ManageVehicle";
import AddVehicle from "./components/pages/adminpages/AddVehicle";
import EditVehicle from "./components/pages/adminpages/EditVehicle";
import ViewRentalRequests from "./components/pages/adminpages/ViewRentalRequests";
import ManageProfile from "./components/pages/adminpages/ManageProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserMaster />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicle-detail/:id" element={<VehicleDetail />} />
            <Route path="/request-status" element={<RequestStatus />} />
            <Route path="/rental-history" element={<RentalHistory />} />
            <Route path="/make-payment" element={<MakePayment />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/admin" element={<AdminMaster />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/categories" element={<ManageCategory />} />
            <Route path="/admin/categories/add" element={<AddCategory />} />
            <Route path="/admin/categories/edit/:id" element={<EditCategory />} />
            <Route path="/admin/vehicles" element={<ManageVehicle />} />
            <Route path="/admin/vehicles/add" element={<AddVehicle />} />
            <Route path="/admin/vehicles/edit/:id" element={<EditVehicle />} />
            <Route path="/admin/requests" element={<ViewRentalRequests />} />
            <Route path="/admin/profile" element={<ManageProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
