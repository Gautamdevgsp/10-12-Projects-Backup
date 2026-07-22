import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../../../services/Firebase";

function AdminHeader() {
  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await signOut(auth);
      sessionStorage.clear();
      nav("/login");
    }
  };

  return (
    <>
  {/* ============================================================
   TOP BAR
   ============================================================ */}
  <div id="topbar">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className="top-contact d-flex flex-wrap">
          <span>
            <i className="fas fa-phone-alt" />
            +1 (800) 123-4567
          </span>
          <span>
            <i className="fas fa-envelope" />
            hello@sarabfood.com
          </span>
          <span>
            <i className="fas fa-map-marker-alt" />
            42 Flavor Street, NY
          </span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="ttag">
            <i className="fas fa-fire me-1" />
            Admin Panel
          </span>
          <div className="tsoc">
            <span style={{ color: "#fff", fontSize: "14px" }}>
              <i className="fas fa-user me-1" /> {user?.name || "Admin"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* ============================================================
   NAVBAR
   ============================================================ */}
  <nav className="navbar navbar-expand-lg" id="nav">
    <div className="container">
      <a className="navbar-brand" href="#">
        <div className="blogo">
          <div className="bico">
            <i className="fas fa-utensils" />
          </div>
          <div>
            <div className="bname">
              Sar<span>ab</span>
            </div>
            <div className="bsub">Admin Dashboard</div>
          </div>
        </div>
      </a>
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
      >
        <i
          className="fas fa-bars"
          style={{ color: "var(--primary)", fontSize: "1.35rem" }}
        />
      </button>
      <div className="collapse navbar-collapse" id="navmenu">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/admin">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/categories">
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/menus">
              Menus
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/orders">
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/verify-token">
              Verify Token
            </Link>
          </li>
        </ul>
        <div className="d-flex align-items-center gap-1">
          <a href="#" className="nav-link nav-cta" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt me-1" />
            Logout
          </a>
        </div>
      </div>
    </div>
  </nav>
</>

  )
}

export default AdminHeader
