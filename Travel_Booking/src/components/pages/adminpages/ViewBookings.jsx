import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import BookingService from "../../../services/BookingService";

function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [load, setLoad] = useState(false);

  async function loadBookings() {
    const data = await BookingService.all();
    setBookings(data);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  const handleAccept = async (id) => {
    const result = await Swal.fire({
      title: "Accept Booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setLoad(true);
      await BookingService.updateBookingStatus(id, "Confirmed");
      toast.success("Booking confirmed successfully!");
      loadBookings();
      setLoad(false);
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject Booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setLoad(true);
      await BookingService.updateBookingStatus(id, "Rejected");
      toast.success("Booking rejected!");
      loadBookings();
      setLoad(false);
    }
  };

  const handleComplete = async (id) => {
    const result = await Swal.fire({
      title: "Mark as Completed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Complete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setLoad(true);
      await BookingService.updateBookingStatus(id, "Completed");
      toast.success("Booking completed!");
      loadBookings();
      setLoad(false);
    }
  };

  return (
    <>
      {load && <p className="text-center text-muted">Processing...</p>}

      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>View Bookings</h3>
          <p>Manage all customer bookings</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact_join">
                <h3 className="text-center">All Bookings</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Package</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Travel Date</th>
                        <th>Persons</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Booking Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan="11" className="text-center">
                            No bookings found
                          </td>
                        </tr>
                      ) : (
                        bookings.map((book, index) => (
                          <tr key={book.id}>
                            <td>{index + 1}</td>
                            <td>{book.packageName}</td>
                            <td>{book.userName}</td>
                            <td>{book.email}</td>
                            <td>{book.contact}</td>
                            <td>{book.travelDate}</td>
                            <td>{book.persons}</td>
                            <td>${book.amount}</td>
                            <td>
                              <span
                                style={{
                                  padding: "3px 12px",
                                  fontSize: "12px",
                                  border: "none",
                                  background:
                                    book.paymentStatus === "Paid"
                                      ? "#28a745"
                                      : book.paymentStatus === "Refunded"
                                      ? "#17a2b8"
                                      : "#ffc107",
                                  color: "#fff",
                                  borderRadius: "4px",
                                }}
                              >
                                {book.paymentStatus}
                              </span>
                            </td>
                            <td>
                              <span
                                style={{
                                  padding: "3px 12px",
                                  fontSize: "12px",
                                  border: "none",
                                  background:
                                    book.bookingStatus === "Confirmed"
                                      ? "#28a745"
                                      : book.bookingStatus === "Cancelled"
                                      ? "#dc3545"
                                      : book.bookingStatus === "Completed"
                                      ? "#17a2b8"
                                      : "#ffc107",
                                  color: "#fff",
                                  borderRadius: "4px",
                                }}
                              >
                                {book.bookingStatus}
                              </span>
                            </td>
                            <td>
                              {book.bookingStatus === "Pending" && (
                                <div className="d-flex gap-1">
                                  <button
                                    className="boxed-btn3"
                                    onClick={() => handleAccept(book.id)}
                                    style={{
                                      padding: "3px 12px",
                                      fontSize: "12px",
                                      border: "none",
                                      cursor: "pointer",
                                      background: "#28a745",
                                      color: "#fff",
                                    }}
                                  >
                                    Accept
                                  </button>
                                  <button
                                    className="boxed-btn3"
                                    onClick={() => handleReject(book.id)}
                                    style={{
                                      padding: "3px 12px",
                                      fontSize: "12px",
                                      border: "none",
                                      cursor: "pointer",
                                      background: "#dc3545",
                                      color: "#fff",
                                    }}
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                              {book.bookingStatus === "Confirmed" && (
                                <button
                                  className="boxed-btn3"
                                  onClick={() => handleComplete(book.id)}
                                  style={{
                                    padding: "3px 12px",
                                    fontSize: "12px",
                                    border: "none",
                                    cursor: "pointer",
                                    background: "#17a2b8",
                                    color: "#fff",
                                  }}
                                >
                                  Complete
                                </button>
                              )}
                              {book.bookingStatus !== "Pending" &&
                                book.bookingStatus !== "Confirmed" && (
                                  <span style={{ color: "#999" }}>--</span>
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

export default ViewBookings;
