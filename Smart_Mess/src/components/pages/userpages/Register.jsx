import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

import { auth } from "../../../services/Firebase";
import UserService from "../../../services/UserService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [load, setLoad] = useState(false);

  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      contact.trim() === "" ||
      address.trim() === ""
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters!");
      return;
    }

    try {
      setLoad(true);

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;

      await UserService.add({
        uid: user.uid,
        name,
        email,
        contact,
        address,
        userType: 2,
        status: "active",
        created_at: new Date().toISOString(),
      });

      toast.success("User Registered Successfully!");

      setTimeout(() => {
        nav("/login");
      }, 1500);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use!");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak!");
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

      <div className="register-hero">
        <div className="container">
          <div className="register-hero-text text-center">
            <h3>Create Account</h3>
            <p>Register to start ordering your favorite food</p>
          </div>
        </div>
      </div>

      <section className="register-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="register-card">
                <h3 className="text-center">Register Here</h3>
                <form onSubmit={handleRegister}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="register-input">
                        <input
                          type="text"
                          className="fctrl"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="register-input">
                        <input
                          type="email"
                          className="fctrl"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="register-input">
                        <input
                          type="password"
                          className="fctrl"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="register-input">
                        <input
                          type="tel"
                          className="fctrl"
                          maxLength={10}
                          placeholder="Phone Number"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="register-input">
                        <textarea
                          className="fctrl"
                          rows={4}
                          placeholder="Your Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="register-btn">
                        <button className="btn-red w-100 justify-content-center" type="submit">
                          <i className="fas fa-user-plus" />
                          Register
                        </button>
                      </div>
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

export default Register;
