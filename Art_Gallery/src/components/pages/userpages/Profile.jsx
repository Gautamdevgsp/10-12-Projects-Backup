import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UserService from "../../../services/UserService";
import AuthServices from "../../../helpers/AuthServices";

function Profile() {
  const nav = useNavigate();
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = AuthServices.getUser();
    if (!user) {
      nav("/login");
      return;
    }
    setName(user.name || "");
    setEmail(user.email || "");
    setContact(user.contact || "");
    setAddress(user.address || "");
    setUserId(user.uid || "");
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name is required");
      return;
    }
    setLoad(true);
    try {
      await UserService.update(userId, { name, contact, address });
      AuthServices.setData({ name, email, contact, address, userType: AuthServices.getUserType() }, userId);
      Swal.fire({
        title: "Updated!",
        text: "Profile updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
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
          <HashLoader size={100} color="#0F172B" />
        </div>
      )}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.9"
            data-stellar-vertical-offset={0}
          />
          <div className="container">
            <div className="banner_content text-center">
              <h2>MY PROFILE</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact_form">
                <form onSubmit={handleUpdate}>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Contact"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 text-right">
                      <button type="submit" className="btn submit_btn">
                        Update Profile
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

export default Profile;
