import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { auth, db } from "../../../services/Firebase";
import UserServices from "../../../services/UserServices";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoad(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = { id: userDoc.id, ...userDoc.data() };
        sessionStorage.setItem("user", JSON.stringify(userData));
        toast.success("Login successful!");

        setTimeout(() => {
          if (userData.userType === 1) {
            nav("/admin");
          } else {
            nav("/");
          }
        }, 200);
      } else {
        toast.error("User data not found!");
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("User not found!");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Invalid password!");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password!");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoad(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const usertype = await UserServices.Google();
      toast.success("Login successful!");
      if (usertype === 1) {
        nav("/admin");
      } else {
        nav("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
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
          <HashLoader size={100} color="#FF4A52" />
        </div>
      )}

      <section id="contact-section">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="slbl">Welcome Back</span>
            <h2 className="stitle">
              Login to <span>Your Account</span>
            </h2>
            <div className="sline" />
            <p className="sdesc mx-auto" style={{ maxWidth: 480 }}>
              Sign in to order food and track your orders
            </p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8" data-aos="fade-left">
              <div className="fcard">
                <form onSubmit={handleLogin}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="flbl">Email Address *</label>
                      <input
                        type="email"
                        className="fctrl"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <label className="flbl">Password *</label>
                      <input
                        type="password"
                        className="fctrl"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-12 text-center">
                      <button className="btn-red" type="submit" style={{ width: "50%", justifyContent: "center" }}>
                        Login
                      </button>
                    </div>
                    <div className="col-12 text-center">
                      <button
                        className="btn-red"
                        type="button"
                        onClick={handleGoogleLogin}
                        style={{ background: "#db4437", width: "50%" }}
                      >
                        <i className="fab fa-google me-2" />
                        Sign in with Google
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
