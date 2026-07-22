import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/Firebase";
import UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [load, setLoad] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoad(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userData = {
        uid: userCredential.user.uid,
        name,
        email,
        contact,
        address,
        userType: 2,
        status: "active",
      };
      const result = await UserService.add(userData);
      sessionStorage.setItem("user", JSON.stringify(result));
      toast.success("Registration successful");
      nav("/");
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
              <h1 className="display-3 text-white animated slideInLeft">Register</h1>
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
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">Register</h5>
                <h1 className="mb-5">Create Account</h1>
              </div>
              <div className="wow fadeInUp" data-wow-delay="0.3s">
                <form onSubmit={handleRegister}>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating">
                        <input type="text" className="form-control" id="name" placeholder="Your Name"
                          value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
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
                      <div className="form-floating">
                        <input type="text" className="form-control" id="contact" placeholder="Your Contact"
                          value={contact} onChange={(e) => setContact(e.target.value)} />
                        <label htmlFor="contact">Contact Number</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea className="form-control" id="address" placeholder="Your Address"
                          style={{ height: 100 }} value={address} onChange={(e) => setAddress(e.target.value)} />
                        <label htmlFor="address">Address</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">Register</button>
                    </div>
                    <div className="col-12 text-center">
                      <p>Already have an account? <Link to="/login">Login here</Link></p>
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
