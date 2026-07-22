import { useState, useEffect } from "react";
import BookingService from "../../../services/OrderService";
import TableService from "../../../services/MenuService";
import { processRefund } from "../../../services/RazorpayService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

function ViewOrders() {
  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(true);

  async function loadBookings() {
    setFetching(true);
    const data = await BookingService.all();
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setBookings(data);
    setFetching(false);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatus = async (booking, newStatus) => {
    const label = newStatus.toLowerCase();
    const msgs = {
      accepted: "Accept",
      rejected: "Reject",
      completed: "Complete",
    };
    let text = `${msgs[label] || label} this booking?`;

    if (newStatus === "Cancelled") {
      const refund = Math.round(parseInt(booking.totalAmount || 0) * 0.5);
      text = `Accept cancellation? 50% (₹${refund}) will be refunded to the user.`;
    }

    const result = await Swal.fire({
      title: `Are you sure?`,
      text,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${newStatus === "Cancelled" ? "Accept Cancel" : msgs[label] || label}`,
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      if (newStatus === "Cancelled") {
        const refund = Math.round(parseInt(booking.totalAmount || 0) * 0.5);
        if (booking.razorpayPaymentId) {
          const rzpRes = await processRefund(booking.razorpayPaymentId, refund);
          if (rzpRes.success) {
            await BookingService.update(booking.id, { bookingStatus: "Cancelled", paymentStatus: "Partially Refunded", previousStatus: "" });
            await TableService.updateStatus(booking.tableId, "available");
            toast.success(`Refund of ₹${refund} processed via Razorpay.`);
          } else {
            await BookingService.update(booking.id, { bookingStatus: "Cancelled", paymentStatus: "Partially Refunded", previousStatus: "" });
            await TableService.updateStatus(booking.tableId, "available");
            toast.warn(`Booking cancelled. Refund of ₹${refund} could not be processed automatically (${rzpRes.error}). Process manually on Razorpay.`);
          }
        } else {
          await BookingService.update(booking.id, { bookingStatus: "Cancelled", paymentStatus: "Partially Refunded", previousStatus: "" });
          await TableService.updateStatus(booking.tableId, "available");
          toast.success(`Cancellation approved. ₹${refund} refunded to user.`);
        }
      } else if (newStatus === "Reverted") {
        const prev = booking.previousStatus || "Accepted";
        await BookingService.update(booking.id, { bookingStatus: prev, previousStatus: "" });
        toast.success("Cancellation request rejected");
      } else {
        await BookingService.updateBookingStatus(booking.id, newStatus);
        if (newStatus === "Rejected" || newStatus === "Completed") {
          await TableService.updateStatus(booking.tableId, "available");
        }
        toast.success(`Booking ${label}`);
      }
      loadBookings();
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      Pending: "bg-warning",
      Accepted: "bg-success",
      Rejected: "bg-danger",
      Completed: "bg-secondary",
      Cancelled: "bg-danger",
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
    <div className="container-xxl py-5">
      <div className="container">
        <div className="mb-4">
          <h5 className="section-title ff-secondary text-start text-primary fw-normal mb-2">Manage Bookings</h5>
          <h1 className="mb-0">All Bookings</h1>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Customer</th>
                <th>Table</th>
                <th>Date</th>
                <th>Time</th>
                <th>Hours</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    <strong>{b.userName}</strong><br />
                    <small>{b.email}</small>
                  </td>
                  <td>Table {b.tableNumber}</td>
                  <td>{b.bookingDate}</td>
                  <td>{b.startTime} - {b.endTime}</td>
                  <td>{b.totalHours}h</td>
                  <td>{b.totalAmount ? `₹${b.totalAmount}` : "-"}</td>
                  <td><span className={`badge ${b.paymentStatus === "Paid" ? "bg-success" : "bg-warning"}`}>{b.paymentStatus}</span></td>
                  <td><span className={`badge ${getStatusBadge(b.bookingStatus)}`}>{b.bookingStatus}</span></td>
                  <td>
                    {b.bookingStatus === "Pending" && (
                      <>
                        <button className="btn btn-sm btn-success me-1" onClick={() => handleStatus(b, "Accepted")}>Accept</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleStatus(b, "Rejected")}>Reject</button>
                      </>
                    )}
                    {b.bookingStatus === "Accepted" && (
                      <button className="btn btn-sm btn-secondary" onClick={() => handleStatus(b, "Completed")}>Complete</button>
                    )}
                    {b.bookingStatus === "CancelRequested" && (
                      <>
                        <button className="btn btn-sm btn-success me-1" onClick={() => handleStatus(b, "Cancelled")}>Accept Cancel</button>
                        <button className="btn btn-sm btn-warning" onClick={() => handleStatus(b, "Reverted")}>Reject Cancel</button>
                      </>
                    )}
                    {(b.bookingStatus === "Completed" || b.bookingStatus === "Rejected" || b.bookingStatus === "Cancelled") && (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center">No bookings found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ViewOrders;
