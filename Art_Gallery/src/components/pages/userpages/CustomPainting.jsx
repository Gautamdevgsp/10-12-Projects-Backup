import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CustomRequestService from "../../../services/CustomRequestService";
import CloudinaryService from "../../../services/CloudinaryService";
import AuthServices from "../../../helpers/AuthServices";

function CustomPainting() {
  const nav = useNavigate();
  const [load, setLoad] = useState(false);
  const [paintingTitle, setPaintingTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [contact, setContact] = useState("");
  const [referenceImage, setReferenceImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = AuthServices.getUser();
    if (!user) {
      nav("/login");
      return;
    }
    if (!paintingTitle || !description) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoad(true);
    try {
      let imageUrl = "";
      if (referenceImage) {
        imageUrl = await CloudinaryService.upload(referenceImage);
      }
      await CustomRequestService.add({
        userId: user.id || user.uid,
        userName: user.name,
        email: user.email,
        contact,
        paintingTitle,
        description,
        referenceImage: imageUrl,
        budget,
        expectedDeliveryDate,
      });
      Swal.fire({
        title: "Request Submitted!",
        text: "We will get back to you soon.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        nav("/my-requests");
      });
      setPaintingTitle("");
      setDescription("");
      setBudget("");
      setExpectedDeliveryDate("");
      setContact("");
      setReferenceImage(null);
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
              <h2>CUSTOM PAINTING</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact_form">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Painting Title *"
                          value={paintingTitle}
                          onChange={(e) => setPaintingTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          rows={4}
                          placeholder="Description *"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Budget (₹)"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control"
                          value={expectedDeliveryDate}
                          onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Contact Number"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label>Reference Image (Optional)</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => setReferenceImage(e.target.files[0])}
                        />
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn submit_btn">
                        Submit Request
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

export default CustomPainting;
