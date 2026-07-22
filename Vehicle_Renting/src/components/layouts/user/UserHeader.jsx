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
    <>
      <div className="call_text_main">
        <div className="container">
          <div className="call_taital">
            <div className="call_text">
              <a href="#">
                <i className="fa fa-map-marker" aria-hidden="true" />
                <span className="padding_left_15">Location</span>
              </a>
            </div>  
            <div className="call_text">
              <a href="#">
                <i className="fa fa-phone" aria-hidden="true" />
                <span className="padding_left_15">(+71) 8522369417</span>
              </a>
            </div>
            <div className="call_text">
              <a href="#">
                <i className="fa fa-envelope" aria-hidden="true" />
                <span className="padding_left_15">demo@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="header_section">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src="images/logo.png" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">Categories</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="/vehicles">Vehicles</Link>
                </li> */}
                {user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/request-status">My Requests</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/rental-history">Rental History</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/make-payment">Make Payment</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fa fa-user" /> {user.name}
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/profile">Profile</Link>
                        <div className="dropdown-divider" />
                        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default UserHeader;
