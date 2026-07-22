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
        }, 1000);
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
      // setLoad(true);
      const userType = await UserService.Google();
      const userDetails = await UserService.getSingle(
        auth.currentUser?.uid || ""
      );
      if (userDetails) {
        sessionStorage.setItem("user", JSON.stringify(userDetails));
      }
      toast.success("Google login successful!");
      setTimeout(() => {
        if (userType === 1) {
          nav("/admin");
        } else {
          nav("/");
        }
      }, 1000);
    } catch (error) {
      toast.error(error.message);
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

      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>Login</h3>
          <p>Sign in to your account</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="contact_join">
                <h3 className="text-center">Login Here</h3>

                <form onSubmit={handleLogin}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="single_input">
                        <input
                          type="email"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="single_input">
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="submit_btn">
                        <button className="boxed-btn4" type="submit">
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-12 mt-3">
                      <div className="submit_btn">
                        <button
                          className="boxed-btn4"
                          type="button"
                          onClick={handleGoogleLogin}
                          style={{ backgroundColor: "#DB4437", borderColor: "#DB4437" }}
                        >
                          Sign in with Google
                        </button>
                      </div>
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
