import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../../../services/UserService";
import TableService from "../../../services/MenuService";
import BookingService from "../../../services/OrderService";
import { HashLoader } from "react-spinners";

function Dashboard() {
  const [stats, setStats] = useState({ users: 0, tables: 0, bookings: 0, pending: 0, accepted: 0, completed: 0 });
  const [fetching, setFetching] = useState(true);

  async function loadStats() {
    setFetching(true);
    const users = await UserService.all();
    const tables = await TableService.all();
    const bookings = await BookingService.all();
    const pending = bookings.filter((b) => b.bookingStatus === "Pending").length;
    const accepted = bookings.filter((b) => b.bookingStatus === "Accepted").length;
    const completed = bookings.filter((b) => b.bookingStatus === "Completed").length;
    setStats({
      users: users.length,
      tables: tables.length,
      bookings: bookings.length,
      pending,
      accepted,
      completed,
    });
    setFetching(false);
  }

  useEffect(() => {
    loadStats();
  }, []);

  if (fetching) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <HashLoader size={80} color="#0F172B" />
      </div>
    );
  }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h5 className="section-title ff-secondary text-center text-primary fw-normal">Dashboard</h5>
          <h1 className="mb-5">Overview</h1>
        </div>

        <div className="row g-4">
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <Link to="/admin/users" className="text-decoration-none">
              <div className="card text-center p-4 border-primary">
                <h1 className="text-primary">{stats.users}</h1>
                <h5>Total Users</h5>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <Link to="/admin/tables" className="text-decoration-none">
              <div className="card text-center p-4 border-success">
                <h1 className="text-success">{stats.tables}</h1>
                <h5>Total Tables</h5>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <Link to="/admin/bookings" className="text-decoration-none">
              <div className="card text-center p-4 border-info">
                <h1 className="text-info">{stats.bookings}</h1>
                <h5>Total Bookings</h5>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <Link to="/admin/bookings" className="text-decoration-none">
              <div className="card text-center p-4 border-warning">
                <h1 className="text-warning">{stats.pending}</h1>
                <h5>Pending Bookings</h5>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.9s">
            <Link to="/admin/bookings" className="text-decoration-none">
              <div className="card text-center p-4 border-success">
                <h1 className="text-success">{stats.accepted}</h1>
                <h5>Accepted Bookings</h5>
              </div>
            </Link>
          </div>

          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="1.1s">
            <Link to="/admin/bookings" className="text-decoration-none">
              <div className="card text-center p-4 border-secondary">
                <h1 className="text-secondary">{stats.completed}</h1>
                <h5>Completed Bookings</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
