import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import UserService from "../../../services/UserService";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      nav("/login");
      return;
    }
    setName(user.name || "");
    setEmail(user.email || "");
    setContact(user.contact || "");
    setAddress(user.address || "");
  }, [nav]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || contact.trim() === "" || address.trim() === "") {
      toast.error("All fields are required!");
      return;
    }

    setLoad(true);
    try {
      const user = JSON.parse(sessionStorage.getItem("user"));
      await UserService.update(user.id, { name, contact, address });

      const updatedUser = { ...user, name, contact, address };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully!");
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

      <section id="contact-section">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="slbl">My Account</span>
            <h2 className="stitle">
              Manage <span>Profile</span>
            </h2>
            <div className="sline" />
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8" data-aos="fade-left">
              <div className="fcard">
                <form onSubmit={handleUpdate}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="flbl">Your Name *</label>
                      <input
                        type="text"
                        className="fctrl"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <label className="flbl">Email</label>
                      <input
                        type="email"
                        className="fctrl"
                        placeholder="Email"
                        value={email}
                        disabled
                      />
                    </div>
                    <div className="col-12">
                      <label className="flbl">Phone Number *</label>
                      <input
                        type="tel"
                        className="fctrl"
                        placeholder="Phone no."
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <label className="flbl">Address *</label>
                      <textarea
                        className="fctrl"
                        rows={4}
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <button className="btn-red" type="submit">
                        <i className="fas fa-save" />
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
