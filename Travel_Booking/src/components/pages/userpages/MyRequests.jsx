import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PackageRequestService from "../../../services/PackageRequestService";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const nav = useNavigate();

  async function loadRequests(userId) {
    const data = await PackageRequestService.getByUser(userId);
    setRequests(data);
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      nav("/login");
      return;
    }
    loadRequests(user.id);
  }, []);

  return (
    <>
      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>My Requests</h3>
          <p>View your package requests</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Destination</th>
                      <th>Budget</th>
                      <th>Days</th>
                      <th>Requirements</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No requests found
                        </td>
                      </tr>
                    ) : (
                      requests.map((req, index) => (
                        <tr key={req.id}>
                          <td>{index + 1}</td>
                          <td>{req.destination}</td>
                          <td>${req.budget}</td>
                          <td>{req.days}</td>
                          <td>{req.requirements}</td>
                          <td>
                            <span
                              className={`badge ${
                                req.status === "Approved"
                                  ? "bg-success"
                                  : req.status === "Rejected"
                                  ? "bg-danger"
                                  : "bg-warning"
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyRequests;
