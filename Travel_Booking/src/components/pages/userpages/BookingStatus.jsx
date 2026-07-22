import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingService from "../../../services/BookingService";

function BookingStatus() {
  const [bookings, setBookings] = useState([]);
  const nav = useNavigate();

  async function loadBookings(userId) {
    const data = await BookingService.getByUser(userId);
    setBookings(data);
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      nav("/login");
      return;
    }
    loadBookings(user.id);
  }, []);

  return (
    <>
      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>My Bookings</h3>
          <p>View your booking status</p>
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
                      <th>Package</th>
                      <th>Travel Date</th>
                      <th>Persons</th>
                      <th>Amount</th>
                      <th>Payment</th>
                      <th>Booking Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No bookings found
                        </td>
                      </tr>
                    ) : (
                      bookings.map((book, index) => (
                        <tr key={book.id}>
                          <td>{index + 1}</td>
                          <td>{book.packageName}</td>
                          <td>{book.travelDate}</td>
                          <td>{book.persons}</td>
                          <td>${book.amount}</td>
                          <td>
                            <span
                              className={`badge ${
                                book.paymentStatus === "Paid"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {book.paymentStatus}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                book.bookingStatus === "Confirmed"
                                  ? "bg-success"
                                  : book.bookingStatus === "Cancelled"
                                  ? "bg-danger"
                                  : book.bookingStatus === "Completed"
                                  ? "bg-info"
                                  : "bg-warning"
                              }`}
                            >
                              {book.bookingStatus}
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

export default BookingStatus;
