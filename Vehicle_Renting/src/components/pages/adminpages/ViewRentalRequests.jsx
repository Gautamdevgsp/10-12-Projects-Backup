import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import RequestService from "../../../services/RequestService";
import VehicleService from "../../../services/VehicleService";

function ViewRentalRequests() {
  const [requests, setRequests] = useState([]);
  const nav = useNavigate();

  async function loadRequests() {
    const data = await RequestService.all();
    setRequests(data);
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      nav("/login");
      return;
    }
    loadRequests();
  }, []);

  const handleApprove = async (id) => {
    const currentReq = requests.find((r) => r.id === id);
    if (currentReq) {
      const alreadyBooked = requests.some(
        (r) => r.vehicleId === currentReq.vehicleId && r.id !== id && r.requestStatus === "Approved" && r.returnStatus !== "Returned"
      );
      if (alreadyBooked) {
        toast.error("This vehicle is already booked and not yet returned!");
        return;
      }
    }

    const result = await Swal.fire({
      title: "Approve Request?",
      text: "This will mark the request as Approved.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await RequestService.updateRequestStatus(id, "Approved");
      await VehicleService.updateStatus(currentReq.vehicleId, "booked");
      toast.success("Request approved successfully!");
      loadRequests();
    }
  };

  const handleMarkReturned = async (id) => {
    const result = await Swal.fire({
      title: "Mark as Returned?",
      text: "This will mark the vehicle as returned.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Returned",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await RequestService.updateReturnStatus(id, "Returned");
      const req = requests.find((r) => r.id === id);
      if (req) {
        await VehicleService.updateStatus(req.vehicleId, "active");
      }
      toast.success("Vehicle marked as returned!");
      loadRequests();
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject Request?",
      text: "This will mark the request as Rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await RequestService.updateRequestStatus(id, "Rejected");
      toast.success("Request rejected!");
      loadRequests();
    }
  };

  return (
    <>
      <div className="page_banner">
        <div className="container">
          <h1>View Rental Requests</h1>
          <p>Manage all customer rental requests</p>
        </div>
      </div>

      <div className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="form_wrap">
                <h3>All Requests</h3>
                <div className="table_wrap">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Vehicle</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Days</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.length === 0 ? (
                        <tr>
                          <td colSpan="12" className="text-center">
                            No requests found
                          </td>
                        </tr>
                      ) : (
                        requests.map((req, index) => (
                          <tr key={req.id}>
                            <td>{index + 1}</td>
                            <td>{req.userName}</td>
                            <td>{req.email}</td>
                            <td>{req.contact}</td>
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
                              {req.returnStatus === "Returned" ? (
                                <span className="status_badge paid">Returned</span>
                              ) : (
                                <span className={`status_badge ${req.requestStatus === "Approved" ? "approved" : req.requestStatus === "Rejected" ? "rejected" : "pending"}`}>
                                  {req.requestStatus}
                                </span>
                              )}
                            </td>
                            <td>
                              {req.requestStatus === "Pending" && (
                                <>
                                  <button
                                    onClick={() => handleApprove(req.id)}
                                    className="action_btn action_btn_sm mb-1"
                                    style={{ background: "#28a745" }}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleReject(req.id)}
                                    className="action_btn action_btn_sm"
                                    style={{ background: "#dc3545", marginLeft: "5px" }}
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              {req.requestStatus === "Approved" && req.paymentStatus === "Paid" && req.returnStatus !== "Returned" && (
                                <button
                                  onClick={() => handleMarkReturned(req.id)}
                                  className="action_btn action_btn_sm"
                                  style={{ background: "#17a2b8" }}
                                >
                                  Mark Returned
                                </button>
                              )}
                              {req.requestStatus !== "Pending" && !(req.requestStatus === "Approved" && req.paymentStatus === "Paid" && req.returnStatus !== "Returned") && (
                                <span style={{ fontSize: "12px", color: "#999" }}>
                                  {req.returnStatus === "Returned" ? "Returned" : req.requestStatus === "Approved" ? "Approved" : "Rejected"}
                                </span>
                              )}
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
      </div>
    </>
  );
}

export default ViewRentalRequests;
