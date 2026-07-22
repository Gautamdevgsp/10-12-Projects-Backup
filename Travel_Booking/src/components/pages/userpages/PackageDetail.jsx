import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import PackageService from "../../../services/PackageService";
import BookingService from "../../../services/BookingService";
import RazorpayService from "../../../services/RazorpayService";

function PackageDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [load, setLoad] = useState(false);
  const [travelDate, setTravelDate] = useState("");
  const [persons, setPersons] = useState(1);

  async function loadPackage() {
    const data = await PackageService.getSingle(id);
    if (data) {
      setPkg(data);
    } else {
      toast.error("Package not found!");
      nav("/packages");
    }
  }

  useEffect(() => {
    loadPackage();
  }, [id]);

  const handleBook = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to book a package!");
      nav("/login");
      return;
    }

    if (!travelDate) {
      toast.error("Please select travel date!");
      return;
    }

    const totalAmount = parseFloat(pkg.price) * persons;

    const result = await Swal.fire({
      title: "Confirm Booking",
      html: `
        <p><strong>Package:</strong> ${pkg.title}</p>
        <p><strong>Destination:</strong> ${pkg.destination}</p>
        <p><strong>Travel Date:</strong> ${travelDate}</p>
        <p><strong>Persons:</strong> ${persons}</p>
        <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setLoad(true);

      const paymentResult = await RazorpayService.initiatePayment({
        amount: totalAmount,
        name: user.name,
        email: user.email,
        contact: user.contact,
        packageName: pkg.title,
      });

      if (paymentResult.success) {
        try {
          await BookingService.add({
            packageId: pkg.id,
            packageName: pkg.title,
            userId: user.id,
            userName: user.name,
            email: user.email,
            contact: user.contact,
            travelDate,
            persons,
            amount: totalAmount.toString(),
            paymentStatus: "Paid",
            bookingStatus: "Pending",
            razorpayPaymentId: paymentResult.razorpay_payment_id,
            createdAt: new Date().toISOString(),
          });

          toast.success("Payment successful! Booking confirmed.");
          nav("/booking-status");
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        if (paymentResult.error !== "Payment cancelled") {
          toast.error(paymentResult.error);
        }
      }

      setLoad(false);
    }
  };

  if (!pkg) {
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

      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>{pkg.title}</h3>
          <p>{pkg.destination}</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="single_destination">
                <div className="thumb">
                  <img
                    src={pkg.imageUrl || "img/place/1.png"}
                    alt={pkg.title}
                    style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="single_destination_details">
                <p>{pkg.description}</p>
                <div className="row mt-4">
                  <div className="col-md-4">
                    <p><strong>Category:</strong> {pkg.categoryName}</p>
                  </div>
                  <div className="col-md-4">
                    <p><strong>Duration:</strong> {pkg.duration}</p>
                  </div>
                  <div className="col-md-4">
                    <p><strong>Price:</strong> ₹{pkg.price} / person</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="contact_join">
                <h3 className="text-center">Book This Package</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleBook();
                  }}
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="single_input">
                        <input
                          type="date"
                          className="form-control"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single_input">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Number of Persons"
                          min="1"
                          value={persons}
                          onChange={(e) => setPersons(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <p className="text-center">
                        <strong>Total: ₹{parseFloat(pkg.price) * persons}</strong>
                      </p>
                    </div>
                    <div className="col-lg-12">
                      <div className="submit_btn">
                        <button className="boxed-btn4" type="submit">
                          Book Now - ₹{parseFloat(pkg.price) * persons}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PackageDetail;
