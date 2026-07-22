import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { auth, db } from "../../../services/Firebase";
import UserService from "../../../services/UserService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      // setLoad(true);
      const userData = await UserService.Google();
      sessionStorage.setItem("user", JSON.stringify(userData));
      toast.success("Login successful!");
      if (userData.userType === 1) {
        nav("/admin");
      } else {
        nav("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoad(false);
    }
  };

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
        }, 300);
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

      <div className="page_banner">
        <div className="container">
          <h1>Login</h1>
          <p>Sign in to your account</p>
        </div>
      </div>

      <div className="about_section layout_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-8">
              <div className="form_wrap">
                <h3>Login Here</h3>

                <form onSubmit={handleLogin}>
                  <div className="mail_section_1">
                    <input
                      type="email"
                      className="mail_text"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                      type="password"
                      className="mail_text mb-3"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="send_bt" style={{ paddingTop: "15px" }}>
                      <button type="submit">Login</button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0 5px" }}>
                      <hr style={{ flex: 1, borderTop: "1px solid #ddd", margin: 0 }} />
                      <span style={{ color: "#999", fontSize: "13px", whiteSpace: "nowrap" }}>OR</span>
                      <hr style={{ flex: 1, borderTop: "1px solid #ddd", margin: 0 }} />
                    </div>

                    <div className="send_bt">
                      <button
                        type="button"
                        onClick={handleGoogleLogin}
                        style={{ backgroundColor: "#db4437", marginTop: "0" }}
                        onMouseEnter={(e) => { e.target.style.backgroundColor = "#c23321"; e.target.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.target.style.backgroundColor = "#db4437"; e.target.style.color = "#fff"; }}
                      >
                        <i className="fa fa-google" /> Sign in with Google
                      </button>
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
