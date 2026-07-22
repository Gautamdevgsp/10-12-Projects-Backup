import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/Firebase";
import { toast } from "react-toastify";

function AdminHeader() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.clear();
      toast.success("Logout Successful!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
    <nav className="navbar main-nav border-less fixed-top navbar-expand-lg p-0">
  <div className="container-fluid p-0">
    {/* logo */}
    <a className="navbar-brand" href="/">
      <img src="/images/logo.png" alt="logo" />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="fa fa-bars" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item dropdown dropdown-slide">
          <Link className="nav-link" to="/admin" data-toggle="dropdown">
            Dashboard
            <span>/</span>
          </Link>
        </li>

        <li className="nav-item dropdown dropdown-slide">
          <a className="nav-link" href="#" data-toggle="dropdown">
            Events
            <span>/</span>
          </a>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/admin/createevent">
              Create Event
            </Link>
            <Link className="dropdown-item" to="/admin/allevents">
              Manage Events
            </Link>
          </div>
        </li>

        <li className="nav-item dropdown dropdown-slide">
          <a className="nav-link" href="#" data-toggle="dropdown">
            Competitions
            <span>/</span>
          </a>
          <div className="dropdown-menu">
            <Link className="dropdown-item" to="/admin/createcompetition">
              Create Competition
            </Link>
            <Link className="dropdown-item" to="/admin/competitions">
              Manage Competitions
            </Link>
          </div>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/admin/enrollments">
            Enrollments
            <span>/</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/admin/results">
            Results
            <span>/</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/admin/certificates">
            Certificates
            {/* <span>/</span> */}
          </Link>
        </li>

      </ul>

      {user && (
        <div style={{ marginRight: "20px", display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ color: "#fff", fontWeight: "bold" }}>
            {user.name}
          </span>
          <button
            onClick={handleLogout}
            className="btn btn-main-md"
            style={{ padding: "8px 15px", fontSize: "14px" }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
</nav>

    </>
  )
}

export default AdminHeader