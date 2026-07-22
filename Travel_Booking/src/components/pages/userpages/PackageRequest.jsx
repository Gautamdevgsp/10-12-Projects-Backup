import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import PackageRequestService from "../../../services/PackageRequestService";

function PackageRequest() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [requirements, setRequirements] = useState("");
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to submit a request!");
      nav("/login");
      return;
    }

    if (
      destination.trim() === "" ||
      budget.trim() === "" ||
      days.trim() === "" ||
      requirements.trim() === ""
    ) {
      toast.error("All fields are required!");
      return;
    }

    setLoad(true);
    try {
      await PackageRequestService.add({
        userId: user.id,
        userName: user.name,
        email: user.email,
        contact: user.contact,
        destination,
        budget,
        days,
        requirements,
        status: "Pending",
        createdAt: new Date().toISOString(),
      });

      toast.success("Package request submitted successfully!");
      nav("/my-requests");
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
          <h3>Request a Package</h3>
          <p>Tell us your dream destination</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-9">
              <div className="contact_join">
                <h3 className="text-center">Submit Your Request</h3>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Destination"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Budget ($)"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Number of Days"
                          value={days}
                          onChange={(e) => setDays(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single_input">
                        <textarea
                          cols={30}
                          rows={6}
                          placeholder="Requirements / Special Requests"
                          value={requirements}
                          onChange={(e) => setRequirements(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="submit_btn">
                        <button className="boxed-btn4" type="submit">
                          Submit Request
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

export default PackageRequest;
