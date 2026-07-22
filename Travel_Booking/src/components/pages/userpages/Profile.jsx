import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import UserService from "../../../services/UserService";

function Profile() {
  const [name, setName] = useState("");
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

      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>My Profile</h3>
          <p>Manage your account</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="contact_join">
                <h3 className="text-center">Update Profile</h3>

                <form onSubmit={handleUpdate}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Phone no."
                          maxLength={10}
                          value={contact}
                          onChange={(e) =>
                            setContact(e.target.value.replace(/[^0-9]/g, ""))
                          }
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single_input">
                        <textarea
                          cols={30}
                          rows={4}
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="submit_btn">
                        <button className="boxed-btn4" type="submit">
                          Update Profile
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

export default Profile;
