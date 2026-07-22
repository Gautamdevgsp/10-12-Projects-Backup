import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingService from "../../../services/OrderService";
import { HashLoader } from "react-spinners";

function OrderHistory() {
  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);

  async function loadBookings() {
    setFetching(true);
    const data = await BookingService.getByUser(user.id || user.uid);
    const past = data.filter((b) =>
      b.bookingStatus === "Completed" || b.bookingStatus === "Cancelled" || b.bookingStatus === "Rejected"
    );
    past.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setBookings(past);
    setFetching(false);
  }

  useEffect(() => {
    if (!user) {
      nav("/login");
      return;
    }
    loadBookings();
  }, []);

  const getStatusBadge = (status) => {
    const map = {
      Completed: "bg-success",
      Cancelled: "bg-danger",
      Rejected: "bg-danger",
    };
    return map[status] || "bg-secondary";
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
              <h1 className="display-3 text-white animated slideInLeft">Booking History</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Booking History</h5>
            <h1 className="mb-5">Past Bookings</h1>
          </div>

        {bookings.length === 0 ? (
          <div className="text-center">
            <p>No past bookings</p>
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
export default OrderHistory;
