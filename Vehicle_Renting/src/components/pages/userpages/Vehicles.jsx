import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import VehicleService from "../../../services/VehicleService";
import { toast } from "react-toastify";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const nav = useNavigate();

  async function loadVehicles() {
    if (!categoryId) {
      setVehicles([]);
      return;
    }
    const data = await VehicleService.getByCategory(categoryId);
    setVehicles(data);
  }

  useEffect(() => {
    loadVehicles();
  }, [categoryId]);

  const handleRentClick = (vehId) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      toast.warning("Please login first");
      setTimeout(()=>{
        nav("/login");
      },500)
      return;
    }
    nav(`/vehicle-detail/${vehId}`);
  };

  return (
    <>
      <div className="page_banner">
        <div className="container">
          <h1>Vehicles</h1>
          <p>Choose your ride</p>
        </div>
      </div>

      <div className="about_section layout_padding">
        <div className="container">
          <div className="row">
            {!categoryId ? (
              <div className="col-12 text-center" style={{ padding: "60px 0" }}>
                <p style={{ fontSize: "18px", color: "#666" }}>
                  Please select a category to view available vehicles.
                </p>
                <Link to="/categories" className="action_btn" style={{ marginTop: "15px" }}>
                  Browse Categories
                </Link>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="col-12 text-center" style={{ padding: "60px 0" }}>
                <p style={{ fontSize: "18px", color: "#666" }}>No vehicles available in this category</p>
              </div>
            ) : (
              vehicles.map((veh) => (
                <div key={veh.id} className="col-lg-4 col-md-6 d-flex">
                  <div className="vehicle_card">
                    <div className="thumb">
                      <img
                        src={veh.imageUrl || "img/place/1.png"}
                        alt={veh.vehicleName}
                      />
                    </div>
                    <div className="place_info">
                      <Link to={`/vehicle-detail/${veh.id}`}>
                        <h3>{veh.vehicleName}</h3>
                      </Link>
                      <p>{veh.brand} {veh.model}</p>
                      <div className="rating_days">
                        <span className="prise">₹{veh.rentPerDay}/day</span>
                        <div className="days">
                          <i className="fa fa-car" /> {veh.vehicleNumber}
                        </div>
                      </div>
                      <div className="card_action">
                        {veh.status === "booked" ? (
                          <span className="status_badge pending" style={{ display: "block", textAlign: "center", width: "100%", padding: "8px" }}>
                            Currently Booked
                          </span>
                        ) : (
                          <button
                            onClick={() => handleRentClick(veh.id)}
                            className="action_btn"
                            style={{ display: "block", textAlign: "center", width: "100%" }}
                          >
                            Rent Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Vehicles;
