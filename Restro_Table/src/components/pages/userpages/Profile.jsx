import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

function Profile() {
  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [contact, setContact] = useState(user?.contact || "");
  const [address, setAddress] = useState(user?.address || "");
  const [load, setLoad] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name is required");
      return;
    }
    setLoad(true);
    try {
      await UserService.update(user.id || user.uid, { name, contact, address });
      const updated = { ...user, name, contact, address };
      sessionStorage.setItem("user", JSON.stringify(updated));
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
    setLoad(false);
  };

  if (!user) {
    nav("/login");
    return null;
  }

  return (
    <>
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container my-5 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-12 text-center">
              <h1 className="display-3 text-white animated slideInLeft">Profile</h1>
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
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">Profile</h5>
                <h1 className="mb-5">My Details</h1>
              </div>
              <div className="wow fadeInUp" data-wow-delay="0.3s">
                <form onSubmit={handleUpdate}>
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
                          value={email} disabled />
                        <label htmlFor="email">Your Email</label>
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
                      <button className="btn btn-primary w-100 py-3" type="submit">Update Profile</button>
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
export default Profile;
