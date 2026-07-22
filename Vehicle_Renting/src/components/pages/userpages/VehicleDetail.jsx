import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import VehicleService from "../../../services/VehicleService";
import RequestService from "../../../services/RequestService";

function VehicleDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [load, setLoad] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  async function loadVehicle() {
    const data = await VehicleService.getSingle(id);
    if (data) {
      setVehicle(data);
    } else {
      toast.error("Vehicle not found!");
      nav("/vehicles");
    }
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      toast.error("Please login first!");
      nav("/login");
      return;
    }
    loadVehicle();
  }, [id]);

  const calculateDays = (from, to) => {
    const fromDt = new Date(from);
    const toDt = new Date(to);
    const diffTime = Math.abs(toDt - fromDt);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const handleRent = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to rent a vehicle!");
      nav("/login");
      return;
    }

    if (vehicle.status === "booked") {
      toast.error("This vehicle is currently booked and unavailable!");
      return;
    }

    if (!fromDate || !toDate) {
      toast.error("Please select both dates!");
      return;
    }

    if (new Date(toDate) <= new Date(fromDate)) {
      toast.error("To date must be after from date!");
      return;
    }

    const totalDays = calculateDays(fromDate, toDate);
    const totalAmount = parseFloat(vehicle.rentPerDay) * totalDays;

    const result = await Swal.fire({
      title: "Confirm Rental",
      html: `
        <p><strong>Vehicle:</strong> ${vehicle.vehicleName}</p>
        <p><strong>Brand:</strong> ${vehicle.brand} ${vehicle.model}</p>
        <p><strong>From:</strong> ${fromDate}</p>
        <p><strong>To:</strong> ${toDate}</p>
        <p><strong>Total Days:</strong> ${totalDays}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm Rental",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setLoad(true);

      try {
        await RequestService.add({
          userId: user.id,
          userName: user.name,
          email: user.email,
          contact: user.contact,
          vehicleId: vehicle.id,
          vehicleName: vehicle.vehicleName,
          fromDate,
          toDate,
          totalDays: totalDays.toString(),
          totalAmount: totalAmount.toString(),
          requestStatus: "Pending",
          paymentStatus: "Pending",
          createdAt: new Date().toISOString(),
        });

        toast.success("Rental request submitted successfully!");
        nav("/request-status");
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoad(false);
      }
    }
  };

  if (!vehicle) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <HashLoader size={80} color="#FF4A52" />
      </div>
    );
  }

  return (
    <>
      {load && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "9999",
          }}
        >
          <HashLoader size={100} color="#FF4A52" />
        </div>
      )}

      <div className="page_banner">
        <div className="container">
          <h1>{vehicle.vehicleName}</h1>
          <p>{vehicle.brand} {vehicle.model}</p>
        </div>
      </div>

      <div className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="single_destination_details">
                <div className="thumb">
                  <img
                    src={vehicle.imageUrl || "img/place/1.png"}
                    alt={vehicle.vehicleName}
                    style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
                  />
                </div>
                <p>{vehicle.description}</p>
                <div className="row mt-4">
                  <div className="col-md-4">
                    <p><strong>Category:</strong> {vehicle.categoryName}</p>
                  </div>
                  <div className="col-md-4">
                    <p><strong>Brand:</strong> {vehicle.brand}</p>
                  </div>
                  <div className="col-md-4">
                    <p><strong>Model:</strong> {vehicle.model}</p>
                  </div>
                  <div className="col-md-4">
                    <p><strong>Vehicle No:</strong> {vehicle.vehicleNumber}</p>
                  </div>
                  <div className="col-md-4">
                    <p><strong>Rent:</strong> ₹{vehicle.rentPerDay} / day</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="form_wrap">
                <h3>Rent This Vehicle</h3>
                {vehicle.status === "booked" ? (
                  <div className="mail_section_1">
                    <div className="alert alert-warning" style={{ textAlign: "center", marginTop: "20px", padding: "20px", fontSize: "16px", fontWeight: "bold" }}>
                      <i className="fa fa-exclamation-triangle" /> This vehicle is currently booked and unavailable for rent.
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleRent();
                    }}
                  >
                    <div className="mail_section_1">
                      <p style={{ fontSize: "13px", color: "#666", margin: "0 0 5px" }}>From Date</p>
                      <input
                        type="date"
                        className="mail_text"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                      <p style={{ fontSize: "13px", color: "#666", margin: "15px 0 5px" }}>To Date</p>
                      <input
                        type="date"
                        className="mail_text mb-3"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                      {fromDate && toDate && (
                        <p style={{ textAlign: "center", marginTop: "15px" }}>
                          <strong>
                            Total: ₹{parseFloat(vehicle.rentPerDay) * calculateDays(fromDate, toDate)} 
                            ({calculateDays(fromDate, toDate)} days)
                          </strong>
                        </p>
                      )}
                      <div className="send_bt">
                        <button type="submit">Rent Now</button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VehicleDetail;
