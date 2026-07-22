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
      {/* header-start */}
      <header>
        <div className="header-area ">
          <div id="sticky-header" className="main-header-area">
            <div className="container-fluid">
              <div className="header_bottom_border">
                <div className="row align-items-center">
                  <div className="col-xl-2 col-lg-2">
                    <div className="logo">
                      <a href="index.html">
                        <img src="img/logo.png" alt="" />
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="main-menu  d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                           <li>
                            <Link to="/about">About</Link>
                          </li>
                          <li>
                            <Link to="/categories">Categories</Link>
                          </li>
                          <li>
                            <Link to="/packages">Packages</Link>
                          </li>
                          {user ? (
                            <>
                              <li>
                                <a href="#">
                                  My Account <i className="ti-angle-down" />
                                </a>
                                <ul className="submenu">
                                  <li>
                                    <Link to="/booking-status">
                                      My Bookings
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/booking-history">
                                      Booking History
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/package-request">
                                      Request Package
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/my-requests">
                                      My Requests
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/profile">Profile</Link>
                                  </li>
                                </ul>
                              </li>
                            </>
                          ) : (
                            <li>
                              <Link to="/register">Register</Link>
                            </li>
                          )}
                         
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 d-none d-lg-block">
                    <div className="social_wrap d-flex align-items-center justify-content-end">
                      <div className="number">
                        {user ? (
                          <p>
                            <i className="fa fa-user" /> {user.name}
                          </p>
                        ) : (
                          <p>
                            <Link to="/login" style={{ color: "black" }}>
                              <i className="fa fa-sign-in" /> Login
                            </Link>
                          </p>
                        )}
                      </div>
                      <div className="social_links d-none d-xl-block">
                        {user && (
                          <button
                            className="boxed-btn3"
                            onClick={handleLogout}
                            style={{
                              padding: "5px 15px",
                              fontSize: "14px",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Logout
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* header-end */}
    </>
  );
}

export default UserHeader;
