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

    if (contact.length !== 10) {
      toast.error("Contact number must be exactly 10 digits!");
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
      console.log(error);

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

      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>Register</h3>
          <p>Create your account to continue</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-9">
              <div className="contact_join">
                <h3 className="text-center">Register Here</h3>

                <form onSubmit={handleRegister}>
                  <div className="row">
                    {/* Name */}
                    <div className="col-lg-6 col-md-6">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-lg-6 col-md-6">
                      <div className="single_input">
                        <input
                          type="email"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="col-lg-6 col-md-6">
                      <div className="single_input">
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="col-lg-6 col-md-6">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Phone no."
                          maxLength={10}
                          value={contact}
                          onChange={(e) =>
                            setContact(
                              e.target.value.replace(/[^0-9]/g, "")
                            )
                          }
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="col-lg-12">
                      <div className="single_input">
                        <textarea
                          cols={30}
                          rows={6}
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-lg-12">
                      <div className="submit_btn">
                        <button className="boxed-btn4" type="submit">
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
      </div>
    </>
  );
}

export default Register;