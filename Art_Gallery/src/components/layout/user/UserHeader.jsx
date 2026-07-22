import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../../../services/Firebase";
import AuthServices from "../../../helpers/AuthServices";

function UserHeader() {
  const nav = useNavigate();
  const user = AuthServices.getUser();

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
      AuthServices.clear();
      nav("/login");
    }
  };

  return (
    <header className="header_area">
      <div className="top_menu">
        <div className="container">
          <div className="top_inner">
            <div className="float-left">
              <a href="#">Visit Us</a>
              <a href="#">Online Support</a>
            </div>
            <div className="float-right">
              <ul className="list header_socila">
                <li><a href="#"><i className="fa fa-facebook" /></a></li>
                <li><a href="#"><i className="fa fa-twitter" /></a></li>
                <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                <li><a href="#"><i className="fa fa-behance" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="main_menu" id="mainNav">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="navbar-brand logo_h" to="/">
              <img src="/img/logo.png" alt="" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
            >
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
              <ul className="nav navbar-nav menu_nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/artworks">Artworks</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/custom-painting">Custom Painting</Link>
                </li>
                {user && (
                  <li className="nav-item submenu dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                      My Account
                    </a>
                    <ul className="dropdown-menu">
                      <li className="nav-item"><Link className="nav-link" to="/my-orders">My Orders</Link></li>
                      <li className="nav-item"><Link className="nav-link" to="/my-requests">My Requests</Link></li>
                      <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                    </ul>
                  </li>
                )}
                {!user && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                )}
              </ul>
              {user ? (
                <ul className="nav navbar-nav menu_nav ml-auto">
                  <li className="nav-item">
                    <span className="nav-link"><i className="fa fa-user me-1" />{user.name}</span>
                  </li>
                  <li className="nav-item">
                    <button className="btn submit_btn" onClick={handleLogout} style={{borderRadius:0}}>Logout</button>
                  </li>
                </ul>
              ) : (
                <ul className="nav navbar-nav menu_nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
export default UserHeader;
