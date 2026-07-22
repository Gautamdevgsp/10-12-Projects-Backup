import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import UserService from "../../../services/UserService";
import AuthServices from "../../../helpers/AuthServices";

function Login() {
  const nav = useNavigate();
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoad(true);
    try {
      let result = await UserService.Login(email, password);
      toast.success("Login successful");
      if (result == 1) {
        nav("/admin");
      } else {
        nav("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoad(false);
  };

  const handleGoogleLogin = async () => {
    setLoad(true);
    try {
      const userData = await UserService.Google();
      AuthServices.setData(userData, userData.uid);
      toast.success("Login successful");
      if (userData.userType == 1) {
        nav("/admin");
      } else {
        nav("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoad(false);
  };

  return (
    <>
      {load && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "9999",
          }}
        >
          <HashLoader size={100} color="#0F172B" />
        </div>
      )}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.9"
            data-stellar-vertical-offset={0}
          />
          <div className="container">
            <div className="banner_content text-center">
              <h2>LOGIN</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="contact_form">
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-md-12 text-center">
                    <button type="submit" className="btn submit_btn w-100">
                      Login
                    </button>
                  </div>
                </form>
                <div className="col-md-12 text-center mt-3">
                  <button
                    className="btn submit_btn w-100"
                    onClick={handleGoogleLogin}
                  >
                    Login with Google
                  </button>
                </div>
                <div className="text-center mt-3">
                  <p>
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
