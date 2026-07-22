import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import RequestService from "../../../services/RequestService";
import VehicleService from "../../../services/VehicleService";
import { loadRazorpayScript, openRazorpay } from "../../../services/RazorpayService";

function MakePayment() {
  const [requests, setRequests] = useState([]);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  async function loadPendingPayments(userId) {
    const data = await RequestService.getByUser(userId);
    const pending = data.filter(
      (r) => r.paymentStatus === "Pending" && r.requestStatus === "Approved"
    );
    setRequests(pending);
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      nav("/login");
      return;
    }
    loadPendingPayments(user.id);
  }, []);

  const handlePayment = async (req) => {
    const result = await Swal.fire({
      title: "Confirm Payment",
      html: `
        <p><strong>Vehicle:</strong> ${req.vehicleName}</p>
        <p><strong>Amount:</strong> ₹${req.totalAmount}</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setLoad(true);
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway");
        setLoad(false);
        return;
      }
      const user = JSON.parse(sessionStorage.getItem("user"));
      openRazorpay({
        amount: parseFloat(req.totalAmount),
        name: user.name,
        email: user.email,
        contact: user.contact,
        onSuccess: async () => {
          await RequestService.updatePaymentStatus(req.id, "Paid");
          await VehicleService.updateStatus(req.vehicleId, "booked");
          toast.success("Payment successful!");
          loadPendingPayments(user.id);
          setLoad(false);
        },
        onError: (err) => {
          toast.error(err || "Payment failed");
          setLoad(false);
        },
      });
    }
  };

  return (
    <>
      {load && (
        <div className="loader_overlay">
          <div style={{ textAlign: "center" }}>
            <HashLoader size={100} color="#FF4A52" />
          </div>
        </div>
      )}

      <div className="page_banner">
        <div className="container">
          <h1>Make Payment</h1>
          <p>Pay for your approved rentals</p>
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
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No pending payments
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
                            <span className="status_badge pending">{req.paymentStatus}</span>
                          </td>
                          <td>
                            <button
                              onClick={() => handlePayment(req)}
                              className="action_btn action_btn_sm"
                              style={{ background: "#28a745" }}
                            >
                              Pay Now
                            </button>
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

export default MakePayment;
