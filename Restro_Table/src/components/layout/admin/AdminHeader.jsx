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
    <div className="container-xxl position-relative p-0">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
        <Link to="/admin" className="navbar-brand p-0">
          <h1 className="text-primary m-0"><i className="fa fa-utensils me-3" />Restoran</h1>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar">
          <span className="fa fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="adminNavbar">
          <div className="navbar-nav ms-auto py-0 pe-4">
            <Link to="/admin" className="nav-item nav-link">Dashboard</Link>
            <Link to="/admin/categories" className="nav-item nav-link">Categories</Link>
            <Link to="/admin/tables" className="nav-item nav-link">Tables</Link>
            <Link to="/admin/bookings" className="nav-item nav-link">Bookings</Link>
            <Link to="/admin/users" className="nav-item nav-link">Users</Link>
          </div>
          <span className="text-light me-3"><i className="fa fa-user me-2" />{user?.name}</span>
          <button className="btn btn-primary py-2 px-4" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container my-5 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-12 text-center">
              <h1 className="display-3 text-white animated slideInLeft">Admin Panel</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminHeader;
