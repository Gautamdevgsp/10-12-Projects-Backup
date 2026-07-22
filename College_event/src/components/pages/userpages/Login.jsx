import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../../services/Firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);

  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoad(true);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        toast.error("User profile not found. Please contact admin.");
        setLoad(false);
        return;
      }

      const userData = {
        uid: uid,
        ...userDocSnap.data()
      };

      if (userData.status !== "active") {
        toast.error("Your account is not active. Please contact admin.");
        setLoad(false);
        return;
      }

      sessionStorage.setItem("user", JSON.stringify(userData));

      toast.success("Login Successful!");

      setTimeout(() => {
        if (userData.userType === 1) {
          nav("/admin");
        } else {
          nav("/");
        }
      }, 1000);
    } catch (error) {
      console.log(error);

      if (error.code === "auth/user-not-found") {
        toast.error("User not found");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password");
      } else {
        toast.error(error.message);
      }
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
          <RingLoader size={100} color="#FF6B35" />
        </div>
      )}

      <div>
        <section className="page-title bg-title overlay-dark">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <div className="title">
                  <h3>Login</h3>
                </div>

                <ol className="breadcrumb p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>

                  <li className="breadcrumb-item active">Login</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-form">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h3>
                    Login to <span className="alternate">Account</span>
                  </h3>

                  <p>Enter your email and password to continue.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="row">
              <div className="col-md-12">
                <input
                  type="email"
                  className="form-control main"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="col-md-12 mt-3">
                <input
                  type="password"
                  className="form-control main"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="col-12 text-center mt-4">
                <button type="submit" className="btn btn-main-md">
                  Login
                </button>
              </div>
              <div className="col-12 text-center mt-3">
                <p>
                  Don't have an account? <a href="/register">Register here</a>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;