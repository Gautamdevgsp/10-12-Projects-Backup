import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";

import { auth, db } from "../../../services/Firebase";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [load, setLoad] = useState(false);

  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      contact === "" ||
      address === ""
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters!");
      return;
    }

    if (contact.length < 10) {
      toast.error("Contact number must be at least 10 digits!");
      return;
    }

    try {
      setLoad(true);

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredentials.user;

      const newUser = {
        uid: user.uid,
        name: name,
        email: email,
        contact: contact,
        address: address,
        userType: 2,
        status: "active",
        created_at: new Date().toISOString(),
      };

      const userRef = doc(db, "users", user.uid);

      await setDoc(userRef, newUser);

      toast.success("User Registered Successfully! Please login.");

      setTimeout(() => {
        nav("/login");
      }, 1500);
    } catch (error) {
      console.log(error);

      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use!");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak!");
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
                  <h3>Register</h3>
                </div>
                <ol className="breadcrumb p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Register</li>
                </ol>
              </div>
            </div>
          
        </div>
      </section>

      {/*====  End of Page Title  ====*/}
      <section className="section contact-form">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h3>
                  Create <span className="alternate">Account</span>
                </h3>
                <p>
                  Fill in the details below to create your account.
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleRegister} className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control main"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <input
                type="email"
                className="form-control main"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <input
                type="password"
                className="form-control main"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <input
                type="password"
                className="form-control main"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <input
                type="contact"
                className="form-control main"
                placeholder="Contact Number"
                value={contact}
                maxLength={10}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <textarea
                className="form-control main"
                rows="5"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-main-md">
                Register
              </button>
            </div>
          </form>
        </div>
      </section>
      </div>

    </>
  );
}

export default Register;
