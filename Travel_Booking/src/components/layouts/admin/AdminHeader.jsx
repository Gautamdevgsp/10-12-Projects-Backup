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
                  <div className="main-menu d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        <li>
                          <Link to="/admin">Dashboard</Link>
                        </li>
                        <li>
                          <Link to="/admin/categories">Categories</Link>
                        </li>
                        <li>
                          <Link to="/admin/packages">Packages</Link>
                        </li>
                        <li>
                          <Link to="/admin/bookings">Bookings</Link>
                        </li>
                        <li>
                          <Link to="/admin/package-requests">Requests</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 d-none d-lg-block">
                  <div className="social_wrap d-flex align-items-center justify-content-end">
                    <div className="number">
                      <p>
                        <i className="fa fa-user" /> {user?.name}
                      </p>
                    </div>
                    <div className="social_links d-none d-xl-block">
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
  );
}

export default AdminHeader;
