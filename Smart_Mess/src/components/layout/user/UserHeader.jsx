import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../../../services/Firebase";

function UserHeader() {
  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const cart = JSON.parse(sessionStorage.getItem("cart") || "[]");
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

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
          {user ? (
            <span className="ttag">
              <i className="fas fa-user me-1" />
              {user.name}
            </span>
          ) : (
            <span className="ttag">
              <i className="fas fa-fire me-1" />
              Free Delivery Today!
            </span>
          )}
          <div className="tsoc">
            
              <>
                <Link to="/profile" style={{ color: "#fff", fontSize: "13px", marginRight: "10px" }}>
                  <i className="fas fa-user-cog" />
                </Link>
                <Link to="/order-history" style={{ color: "#fff", fontSize: "13px", marginRight: "10px" }}>
                  <i className="fas fa-history" />
                </Link>
                <a href="#" onClick={handleLogout} style={{ color: "#fff", fontSize: "13px" }}>
                  <i className="fas fa-sign-out-alt" />
                </a>
              </>
            
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
            <div className="bsub">Fast Food &amp; Restaurant</div>
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
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/place-order">
              Order Now
            </Link>
          </li>

             {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/order-history">
                My Orders
              </Link>
            </li>
          )}

          <li className="nav-item">
            <Link className="nav-link" to="/cart" style={{ position: "relative" }}>
              <i className="fas fa-shopping-cart" />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute", top: "2px", right: "-8px", fontSize: "10px",
                    background: "var(--primary)", color: "#fff", borderRadius: "50%",
                    width: "16px", height: "16px", display: "flex", alignItems: "center",
                    justifyContent: "center", fontWeight: "bold",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

        
        </ul>
        <div className="d-flex align-items-center gap-1">
          {!user ? (
            <>
              <Link to="/login" className="nav-link nav-cta">
                <i className="fas fa-sign-in-alt me-1" />
                Login
              </Link>
              <Link to="/register" className="nav-link nav-cta">
                <i className="fas fa-user-plus me-1" />
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="nav-link nav-cta">
                <i className="fas fa-user me-1" />
                Profile
              </Link>
              <a href="#" className="nav-link nav-cta" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-1" />
                Logout
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  </nav>
</>

    </>
  )
}

export default UserHeader
