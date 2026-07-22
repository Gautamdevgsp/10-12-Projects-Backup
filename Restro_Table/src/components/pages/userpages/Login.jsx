  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../../../services/Firebase";
  import UserService from "../../../services/UserService";
  import { RingLoader } from "react-spinners";
  import { toast } from "react-toastify";
  import { HashLoader } from "react-spinners";

  function Login() {
    const nav = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [load, setLoad] = useState(false);
    const [gload, setGload] = useState(false);

    const handleGoogleLogin = async () => {
      setGload(true);
      try {
        const userData = await UserService.Google();
        sessionStorage.setItem("user", JSON.stringify(userData));
        if (userData.userType === 1) {
          nav("/admin");
        } else {
          nav("/");
        }
      } catch {
        toast.error("Google login failed");
      }
      setGload(false);
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      if (!email || !password) {
        toast.error("Please fill all fields");
        return;
      }
      setLoad(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        let users = await UserService.all({ uid });
        if (users.length === 0) {
          const doc = await UserService.getSingle(uid);
          if (doc) {
            users = [doc];
          } else {
            toast.error("User not found");
            setLoad(false);
            return;
          }
        }
        const userData = users[0];
        sessionStorage.setItem("user", JSON.stringify(userData));
        toast.success("Login successful");
        if (userData.userType === 1) {
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
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container my-5 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-12 text-center">
              <h1 className="display-3 text-white animated slideInLeft">Login</h1>
            </div>
          </div>
        </div>
      </div>
      {load && (
        <div style={{
          position: "fixed", width: "100%", height: "100%", top: 0, left: 0,
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: "9999",
        }}>
          <HashLoader size={100} color="#0F172B" />
        </div>
      )}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">Login</h5>
                <h1 className="mb-5">Welcome Back</h1>
              </div>
              <div className="wow fadeInUp" data-wow-delay="0.3s">
                <form onSubmit={handleLogin}>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="email" className="form-control" id="email" placeholder="Your Email"
                          value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="password" className="form-control" id="password" placeholder="Your Password"
                          value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">Login</button>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-danger w-100 py-3" type="button" onClick={handleGoogleLogin} disabled={gload}>
                        {gload ? "Signing in..." : "Sign in with Google"}
                      </button>
                    </div>
                    <div className="col-12 text-center">
                      <p>Don't have an account? <Link to="/register">Register here</Link></p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
