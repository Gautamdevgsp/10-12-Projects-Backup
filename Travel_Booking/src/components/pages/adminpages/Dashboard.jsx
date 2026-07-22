import { useState, useEffect } from "react";
import CategoryService from "../../../services/CategoryService";
import PackageService from "../../../services/PackageService";
import BookingService from "../../../services/BookingService";
import PackageRequestService from "../../../services/PackageRequestService";

function Dashboard() {
  const [categories, setCategories] = useState(0);
  const [packages, setPackages] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [requests, setRequests] = useState(0);

  async function loadData() {
    const catData = await CategoryService.all();
    setCategories(catData.length);

    const pkgData = await PackageService.all();
    setPackages(pkgData.length);

    const bookData = await BookingService.all();
    setBookings(bookData.length);

    const reqData = await PackageRequestService.all();
    setRequests(reqData.length);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>Admin Dashboard</h3>
          <p>Overview of your travel booking system</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="single_destination text-center">
                <div className="content" style={{ padding: "30px 20px" }}>
                  <h3 style={{ fontSize: "36px", color: "#007bff" }}>
                    {categories}
                  </h3>
                  <p>Total Categories</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="single_destination text-center">
                <div className="content" style={{ padding: "30px 20px" }}>
                  <h3 style={{ fontSize: "36px", color: "#28a745" }}>
                    {packages}
                  </h3>
                  <p>Total Packages</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="single_destination text-center">
                <div className="content" style={{ padding: "30px 20px" }}>
                  <h3 style={{ fontSize: "36px", color: "#ffc107" }}>
                    {bookings}
                  </h3>
                  <p>Total Bookings</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="single_destination text-center">
                <div className="content" style={{ padding: "30px 20px" }}>
                  <h3 style={{ fontSize: "36px", color: "#dc3545" }}>
                    {requests}
                  </h3>
                  <p>Package Requests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
