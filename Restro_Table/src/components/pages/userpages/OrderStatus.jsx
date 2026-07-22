import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingService from "../../../services/OrderService";
import TableService from "../../../services/MenuService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

function OrderStatus() {
  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);

  async function loadBookings() {
    setFetching(true);
    const data = await BookingService.getByUser(user.id || user.uid);
    const active = data.filter((b) => b.bookingStatus === "Pending" || b.bookingStatus === "Accepted" || b.bookingStatus === "CancelRequested");
    active.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setBookings(active);
    setFetching(false);
  }

  useEffect(() => {
    if (!user) {
      nav("/login");
      return;
    }
    loadBookings();
  }, []);

  const handleCancelRequest = async (booking) => {
    const refundAmount = parseInt(booking.totalAmount || 0) * 0.5;
    const result = await Swal.fire({
      title: "Request Cancellation?",
      html: `A 50% refund of <strong>₹${refundAmount}</strong> will be processed if approved.<br/><br/>Are you sure?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Request Cancel",
      cancelButtonText: "Keep Booking",
    });
    if (result.isConfirmed) {
      await BookingService.update(booking.id, { bookingStatus: "CancelRequested", previousStatus: booking.bookingStatus });
      toast.success("Cancellation request sent");
      loadBookings();
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      Pending: "bg-warning",
      Accepted: "bg-success",
      CancelRequested: "bg-info",
    };
    return map[status] || "bg-warning";
  };

  if (fetching) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <HashLoader size={80} color="#0F172B" />
      </div>
    );
  }

  return (
    <>
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container my-5 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-12 text-center">
              <h1 className="display-3 text-white animated slideInLeft">My Bookings</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">My Bookings</h5>
            <h1 className="mb-5">Active Bookings</h1>
          </div>

        {bookings.length === 0 ? (
          <div className="text-center">
            <p>No active bookings</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Table</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Hours</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>Table {b.tableNumber}</td>
                    <td>{b.bookingDate}</td>
                    <td>{b.startTime} - {b.endTime}</td>
                    <td>{b.totalHours}h</td>
                    <td>{b.totalAmount ? `₹${b.totalAmount}` : "-"}</td>
                    <td><span className={`badge ${getStatusBadge(b.bookingStatus)}`}>{b.bookingStatus}</span></td>
                    <td>
                      {b.bookingStatus === "Pending" && (
                        <button className="btn btn-sm btn-danger" onClick={() => handleCancelRequest(b)}>Request Cancel</button>
                      )}
                      {b.bookingStatus === "Accepted" && (
                        <button className="btn btn-sm btn-danger" onClick={() => handleCancelRequest(b)}>Request Cancel</button>
                      )}
                      {b.bookingStatus === "CancelRequested" && (
                        <span className="text-info fw-bold">Pending Approval</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
export default OrderStatus;
