import { useState, useEffect } from "react";
import CategoryService from "../../../services/CategoryService";
import VehicleService from "../../../services/VehicleService";
import RequestService from "../../../services/RequestService";

function Dashboard() {
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [approvedRequests, setApprovedRequests] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [rejectedRequests, setRejectedRequests] = useState(0);

  async function loadData() {
    const catData = await CategoryService.all();
    setTotalCategories(catData.length);

    const vehData = await VehicleService.all();
    setTotalVehicles(vehData.length);

    const reqData = await RequestService.all();
    setTotalRequests(reqData.length);
    setApprovedRequests(reqData.filter((r) => r.requestStatus === "Approved").length);
    setPendingRequests(reqData.filter((r) => r.requestStatus === "Pending").length);
    setRejectedRequests(reqData.filter((r) => r.requestStatus === "Rejected").length);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="page_banner">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Overview of your vehicle rental system</p>
        </div>
      </div>

      <div className="about_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="stat_card">
                <h2 style={{ color: "#007bff" }}>{totalCategories}</h2>
                <p>Total Categories</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat_card">
                <h2 style={{ color: "#28a745" }}>{totalVehicles}</h2>
                <p>Total Vehicles</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat_card">
                <h2 style={{ color: "#ffc107" }}>{totalRequests}</h2>
                <p>Total Requests</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat_card">
                <h2 style={{ color: "#28a745" }}>{approvedRequests}</h2>
                <p>Approved Requests</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat_card">
                <h2 style={{ color: "#ffc107" }}>{pendingRequests}</h2>
                <p>Pending Requests</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat_card">
                <h2 style={{ color: "#dc3545" }}>{rejectedRequests}</h2>
                <p>Rejected Requests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
