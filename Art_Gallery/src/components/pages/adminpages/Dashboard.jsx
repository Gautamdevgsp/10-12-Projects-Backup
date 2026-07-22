import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import CategoryService from "../../../services/CategoryService";
import ArtworkService from "../../../services/ArtworkService";
import UserService from "../../../services/UserService";
import OrderService from "../../../services/OrderService";
import CustomRequestService from "../../../services/CustomRequestService";

function Dashboard() {
  const [fetching, setFetching] = useState(true);
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalArtworks: 0,
    totalUsers: 0,
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    pendingRequests: 0,
  });

  const loadData = async () => {
    setFetching(true);
    try {
      const [categories, artworks, users, orders, requests] = await Promise.all([
        CategoryService.all(),
        ArtworkService.all(),
        UserService.all(),
        OrderService.all(),
        CustomRequestService.all(),
      ]);
      const pendingOrders = orders.filter((o) => o.orderStatus === "Pending").length;
      const deliveredOrders = orders.filter((o) => o.orderStatus === "Delivered").length;
      const pendingRequests = requests.filter((r) => r.requestStatus === "Pending").length;
      setStats({
        totalCategories: categories.length,
        totalArtworks: artworks.length,
        totalUsers: users.length,
        totalOrders: orders.length,
        pendingOrders,
        deliveredOrders,
        pendingRequests,
      });
    } catch (error) {
      console.log(error);
    }
    setFetching(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (fetching) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <HashLoader size={80} color="#0F172B" />
      </div>
    );
  }

  return (
    <>
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.9"
            data-stellar-vertical-offset={0}
          />
          <div className="container">
            <div className="banner_content text-center">
              <h2>DASHBOARD</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <Link to="/admin/categories" className="text-decoration-none">
              <div className="card text-center p-4 border-primary h-100">
                <h6 className="text-muted mb-2">Total Categories</h6>
                <h2 className="fw-bold text-primary">{stats.totalCategories}</h2>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6">
            <Link to="/admin/artworks" className="text-decoration-none">
              <div className="card text-center p-4 border-primary h-100">
                <h6 className="text-muted mb-2">Total Artworks</h6>
                <h2 className="fw-bold text-primary">{stats.totalArtworks}</h2>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6">
            <Link to="/admin/users" className="text-decoration-none">
              <div className="card text-center p-4 border-primary h-100">
                <h6 className="text-muted mb-2">Total Users</h6>
                <h2 className="fw-bold text-primary">{stats.totalUsers}</h2>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6">
            <Link to="/admin/orders" className="text-decoration-none">
              <div className="card text-center p-4 border-primary h-100">
                <h6 className="text-muted mb-2">Total Orders</h6>
                <h2 className="fw-bold text-primary">{stats.totalOrders}</h2>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6">
            <Link to="/admin/orders" className="text-decoration-none">
              <div className="card text-center p-4 border-primary h-100">
                <h6 className="text-muted mb-2">Pending Orders</h6>
                <h2 className="fw-bold text-warning">{stats.pendingOrders}</h2>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6">
            <Link to="/admin/orders" className="text-decoration-none">
              <div className="card text-center p-4 border-primary h-100">
                <h6 className="text-muted mb-2">Delivered Orders</h6>
                <h2 className="fw-bold text-success">{stats.deliveredOrders}</h2>
              </div>
            </Link>
          </div>
          <div className="col-lg-4 col-md-6">
            <Link to="/admin/custom-requests" className="text-decoration-none">
              <div className="card text-center p-4 border-primary h-100">
                <h6 className="text-muted mb-2">Pending Custom Requests</h6>
                <h2 className="fw-bold text-danger">{stats.pendingRequests}</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Dashboard;
