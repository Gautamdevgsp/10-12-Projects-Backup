import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TableService from "../../../services/MenuService";
import BookingService from "../../../services/OrderService";
import { loadRazorpayScript, openRazorpay } from "../../../services/RazorpayService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

function PlaceOrder() {
  const { id } = useParams();
  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [table, setTable] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [numberOfHours, setNumberOfHours] = useState(1);
  const [numberOfGuests, setNumberOfGuests] = useState(2);
  const [fetching, setFetching] = useState(true);
  const [load, setLoad] = useState(false);

  async function releaseSingleIfExpired(table) {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const cur = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    const activeBookings = await BookingService.all({ tableId: table.id, bookingDate: today });
    const hasActive = activeBookings.some(b =>
      (b.bookingStatus === "Pending" || b.bookingStatus === "Accepted") && b.endTime > cur
    );
    if (!hasActive && table.status === "unavailable") {
      await TableService.updateStatus(table.id, "available");
      table.status = "available";
    }
  }

  async function loadTable() {
    setFetching(true);
    const data = await TableService.getSingle(id);
    if (data) await releaseSingleIfExpired(data);
    setTable(data);
    setFetching(false);
  }

  useEffect(() => {
    loadTable();
  }, [id]);

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  const getMinTime = () => {
    if (bookingDate === today) {
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      return `${h}:${m}`;
    }
    return "";
  };

  const calcEndTime = (start, hours) => {
    if (!start || !hours) return "";
    const [h, m] = start.split(":").map(Number);
    const totalMin = h * 60 + m + parseInt(hours) * 60;
    const endH = String(Math.floor(totalMin / 60) % 24).padStart(2, "0");
    const endM = String(totalMin % 60).padStart(2, "0");
    return `${endH}:${endM}`;
  };

  const endTime = calcEndTime(startTime, numberOfHours);
  const totalAmount = table && startTime && numberOfHours
    ? parseInt(table.ratePerHour) * parseInt(numberOfHours)
    : 0;

  const handleBookTable = async () => {
    if (!user) {
      toast.error("Please login to book a table");
      nav("/login");
      return;
    }
    if (!bookingDate || !startTime || !numberOfHours) {
      toast.error("Please fill all fields");
      return;
    }
    if (parseInt(numberOfGuests) > parseInt(table.capacity)) {
      toast.error(`Maximum capacity for this table is ${table.capacity} guests`);
      return;
    }
    if (parseInt(numberOfHours) < 1) {
      toast.error("Minimum booking is 1 hour");
      return;
    }

    const conflicts = await BookingService.checkTimeConflict(table.id, bookingDate, startTime, endTime);
    if (conflicts.length > 0) {
      toast.error("Table is already booked during this time slot");
      return;
    }

    const rzpLoaded = await loadRazorpayScript();
    if (!rzpLoaded) {
      toast.error("Failed to load payment gateway");
      return;
    }

    openRazorpay({
      amount: totalAmount,
      name: user.name,
      email: user.email,
      contact: user.contact,
      onSuccess: async (response) => {
        setLoad(true);
        try {
          await TableService.updateStatus(table.id, "unavailable");
          await BookingService.add({
            userId: user.id || user.uid,
            userName: user.name,
            email: user.email,
            contact: user.contact,
            tableId: table.id,
            tableNumber: table.tableNumber,
            bookingDate,
            startTime,
            endTime,
            numberOfGuests: numberOfGuests.toString(),
            totalHours: numberOfHours.toString(),
            totalAmount: totalAmount.toString(),
            paymentStatus: "Paid",
            bookingStatus: "Pending",
            razorpayPaymentId: response.razorpay_payment_id,
          });

          await Swal.fire({
            title: "Booking Confirmed!",
            text: `Payment successful. Your table has been booked.`,
            icon: "success",
            confirmButtonText: "OK",
          });
          nav("/my-bookings");
        } catch {
          toast.error("Failed to create booking");
        }
        setLoad(false);
      },
      onError: (error) => {
        toast.error(error || "Payment failed");
      },
    });
  };

  if (fetching) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <HashLoader size={80} color="#0F172B" />
      </div>
    );
  }

  if (!table) {
    return (
      <div className="container-xxl py-5 text-center">
        <p>Table not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container my-5 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-12 text-center">
              <h1 className="display-3 text-white animated slideInLeft">Book a Table</h1>
            </div>
          </div>
        </div>
      </div>
      {load && (
        <div style={{
          position: "fixed", width: "100%", height: "100%", top: 0, left: 0,
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: "9999",
        }}>
          <HashLoader size={100} color="#0F172B" />
        </div>
      )}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="card text-center p-0 border-0 shadow-sm overflow-hidden">
                <div style={{ height: 200, overflow: "hidden" }}>
                  <img src={table.imageUrl || "img/table-placeholder.jpg"} alt={`Table ${table.tableNumber}`}
                    className="w-100 h-100" style={{ objectFit: "cover" }} />
                </div>
                <div className="p-4">
                  <h2>Table {table.tableNumber}</h2>
                  <p className="mb-1"><strong>Capacity:</strong> {table.capacity} guests</p>
                  <p className="mb-1"><strong>Rate:</strong> ₹{table.ratePerHour}/hour</p>
                  {table.categoryName && <p><strong>Section:</strong> {table.categoryName}</p>}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h5 className="section-title ff-secondary text-start text-primary fw-normal">Book a Table</h5>
              <h1 className="mb-4">Reserve Your Table</h1>

              <div className="row g-3">
                <div className="col-12">
                  <div className="form-floating">
                    <input type="date" className="form-control" id="bookingDate"
                      min={today} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
                    <label htmlFor="bookingDate">Booking Date</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-floating">
                    <input type="time" className="form-control" id="startTime"
                      min={getMinTime()} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    <label htmlFor="startTime">Start Time</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-floating">
                    <input type="number" className="form-control" id="hours" min="1" max="12"
                      value={numberOfHours} onChange={(e) => setNumberOfHours(e.target.value)} />
                    <label htmlFor="hours">Hours</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <input type="number" className="form-control" id="guests"
                      placeholder="Number of Guests" min="1" max={table.capacity}
                      value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} />
                    <label htmlFor="guests">Number of Guests (max {table.capacity})</label>
                  </div>
                </div>

                {startTime && numberOfHours && (
                  <div className="col-12">
                    <div className="bg-light p-3 rounded">
                      <p className="mb-1"><strong>Time Slot:</strong> {startTime} - {endTime}</p>
                      <p className="mb-0"><strong>Total:</strong> ₹{totalAmount}</p>
                    </div>
                  </div>
                )}

                <div className="col-12">
                  <button className="btn btn-primary w-100 py-3" onClick={handleBookTable}>
                    Pay ₹{totalAmount} & Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PlaceOrder;
