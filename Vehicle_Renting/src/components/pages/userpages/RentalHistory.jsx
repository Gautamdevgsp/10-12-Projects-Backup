import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequestService from "../../../services/RequestService";

function RentalHistory() {
  const [requests, setRequests] = useState([]);
  const nav = useNavigate();

  async function loadCompletedRequests(userId) {
    const data = await RequestService.getByUser(userId);
    const completed = data.filter(
      (r) => r.requestStatus === "Approved" || r.requestStatus === "Rejected"
    );
    setRequests(completed);
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      nav("/login");
      return;
    }
    loadCompletedRequests(user.id);
  }, []);

  return (
    <>
      <div className="page_banner">
        <div className="container">
          <h1>Rental History</h1>
          <p>Your completed rental history</p>
        </div>
      </div>

      <div className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table_wrap">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Vehicle</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Days</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Return</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center">
                          No rental history found
                        </td>
                      </tr>
                    ) : (
                      requests.map((req, index) => (
                        <tr key={req.id}>
                          <td>{index + 1}</td>
                          <td>{req.vehicleName}</td>
                          <td>{req.fromDate}</td>
                          <td>{req.toDate}</td>
                          <td>{req.totalDays}</td>
                          <td>₹{req.totalAmount}</td>
                          <td>
                            <span className={`status_badge ${req.paymentStatus === "Paid" ? "paid" : "pending"}`}>
                              {req.paymentStatus}
                            </span>
                          </td>
                            <td>
                              <span className={`status_badge ${req.requestStatus === "Approved" ? "approved" : "rejected"}`}>
                                {req.requestStatus}
                              </span>
                            </td>
                            <td>
                              <span className={`status_badge ${req.returnStatus === "Returned" ? "paid" : "pending"}`}>
                                {req.returnStatus || "Pending"}
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

export default RentalHistory;
