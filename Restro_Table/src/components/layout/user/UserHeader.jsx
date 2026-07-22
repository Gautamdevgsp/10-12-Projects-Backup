import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../../../services/Firebase";

function UserHeader() {
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
        <Link to="/" className="navbar-brand p-0">
          <h1 className="text-primary m-0">
            <i className="fa fa-utensils me-3" />Restoran
          </h1>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="fa fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 pe-4">
            <Link to="/" className="nav-item nav-link">Home</Link>
            <Link to="/categories" className="nav-item nav-link">Categories</Link>
            <Link to="/tables" className="nav-item nav-link">Tables</Link>
            {user ? (
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                  My Account
                </a>
                <div className="dropdown-menu m-0">
                  <Link to="/my-bookings" className="dropdown-item">My Bookings</Link>
                  <Link to="/booking-history" className="dropdown-item">Booking History</Link>
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                </div>
              </div>
            ) : (
              <Link to="/register" className="nav-item nav-link">Register</Link>
            )}
          </div>
          {user ? (
            <div className="d-flex align-items-center">
              <span className="text-light me-3"><i className="fa fa-user me-2" />{user.name}</span>
              <button className="btn btn-primary py-2 px-4" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary py-2 px-4">Login</Link>
          )}
        </div>
      </nav>
    </div>
  );
}
export default UserHeader;
