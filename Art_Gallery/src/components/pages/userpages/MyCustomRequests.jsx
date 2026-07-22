import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import CustomRequestService from "../../../services/CustomRequestService";
import AuthServices from "../../../helpers/AuthServices";

function MyCustomRequests() {
  const nav = useNavigate();
  const [load, setLoad] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const user = AuthServices.getUser();
    if (!user) {
      nav("/login");
      return;
    }
    loadRequests(user.uid);
  }, []);

  const loadRequests = async (userId) => {
    setLoad(true);
    try {
      const data = await CustomRequestService.getByUser(userId);
      setRequests(data);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "badge bg-success";
      case "Rejected":
        return "badge bg-danger";
      case "Completed":
        return "badge bg-info";
      default:
        return "badge bg-warning";
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
              <h2>MY CUSTOM REQUESTS</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Painting Title</th>
                    <th>Description</th>
                    <th>Budget</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id}>
                      <td>{req.paintingTitle}</td>
                      <td>{req.description}</td>
                      <td>₹{req.budget || "-"}</td>
                      <td>
                        <span className={getStatusBadge(req.requestStatus)}>
                          {req.requestStatus}
                        </span>
                      </td>
                      <td>
                        {req.createdAt
                          ? new Date(req.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && !load && (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No custom requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyCustomRequests;
