import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../../services/firebaseUtils";

function ManageProfile() {
  const nav = useNavigate();
  const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "null");
    if (!user) {
      toast.error("Please login first");
      nav("/login");
    }
  }, []);

  const [name, setName] = useState(storedUser.name || "");
  const [contact, setContact] = useState(storedUser.contact || "");
  const [address, setAddress] = useState(storedUser.address || "");
  const [load, setLoad] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !contact || !address) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoad(true);

      const updatedData = {
        name,
        contact,
        address,
      };

      await updateUserProfile(storedUser.uid, updatedData);

      const updatedUser = { ...storedUser, ...updatedData };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully");

      setTimeout(() => {
        nav("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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

      <section className="page-title bg-title overlay-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="title">
                <h3>Manage Profile</h3>
              </div>
              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Manage Profile</li>
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
                  Update <span className="alternate">Profile</span>
                </h3>
                <p>Modify your personal details below.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="row">
            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Name</label>
              <input
                type="text"
                className="form-control main"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Email</label>
              <input
                type="text"
                className="form-control main"
                placeholder="Email"
                value={storedUser.email || ""}
                disabled
              />
            </div>

            <div className="col-md-12">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Contact Number</label>
              <input
                type="text"
                className="form-control main"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div className="col-md-12">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Address</label>
              <textarea
                rows="5"
                className="form-control main"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-main-md">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ManageProfile;
