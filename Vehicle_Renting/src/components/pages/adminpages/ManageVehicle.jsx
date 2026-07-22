import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import VehicleService from "../../../services/VehicleService";

function ManageVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const nav = useNavigate();

  async function loadVehicles() {
    const data = await VehicleService.all();
    setVehicles(data);
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      nav("/login");
      return;
    }
    loadVehicles();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await VehicleService.delete(id);
      toast.success("Vehicle deleted successfully!");
      loadVehicles();
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const result = await Swal.fire({
      title: "Change Status?",
      text: `This will mark the vehicle as ${newStatus}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await VehicleService.updateStatus(id, newStatus);
      toast.success(`Vehicle ${newStatus} successfully!`);
      loadVehicles();
    }
  };

  return (
    <>
      <div className="page_banner">
        <div className="container">
          <h1>Manage Vehicles</h1>
          <p>Add, edit and manage vehicles</p>
        </div>
      </div>

      <div className="about_section layout_padding">
        <div className="container">
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-12 text-right">
              <Link to="/admin/vehicles/add" className="action_btn">
                + Add Vehicle
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="form_wrap">
                <h3>All Vehicles</h3>
                <div className="table_wrap">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Number</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Rent/Day</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="text-center">
                            No vehicles found
                          </td>
                        </tr>
                      ) : (
                        vehicles.map((veh, index) => (
                          <tr key={veh.id}>
                            <td>{index + 1}</td>
                            <td>
                              {veh.imageUrl ? (
                                <img
                                  src={veh.imageUrl}
                                  alt={veh.vehicleName}
                                  style={{
                                    width: "50px",
                                    height: "40px",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                  }}
                                />
                              ) : (
                                <span style={{ fontSize: "12px", color: "#999" }}>No img</span>
                              )}
                            </td>
                            <td>{veh.vehicleName}</td>
                            <td>{veh.categoryName}</td>
                            <td>{veh.vehicleNumber}</td>
                            <td>{veh.brand}</td>
                            <td>{veh.model}</td>
                            <td>₹{veh.rentPerDay}</td>
                            <td>
                              <button
                                onClick={() => handleToggleStatus(veh.id, veh.status)}
                                className={`status_badge ${veh.status}`}
                              >
                                {veh.status}
                              </button>
                            </td>
                            <td>
                              <Link
                                to={`/admin/vehicles/edit/${veh.id}`}
                                className="action_btn action_btn_sm"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(veh.id)}
                                className="action_btn action_btn_sm"
                                style={{ background: "#dc3545", marginLeft: "5px" }}
                              >
                                Delete
                              </button>
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

export default ManageVehicle;
