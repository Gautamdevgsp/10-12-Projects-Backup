import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import PackageService from "../../../services/PackageService";

function ManagePackages() {
  const [packages, setPackages] = useState([]);

  async function loadPackages() {
    const data = await PackageService.all();
    setPackages(data);
  }

  useEffect(() => {
    loadPackages();
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
      await PackageService.delete(id);
      toast.success("Package deleted successfully!");
      loadPackages();
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    await PackageService.updateStatus(id, newStatus);
    toast.success(`Package ${newStatus} successfully!`);
    loadPackages();
  };

  return (
    <>
      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>Manage Packages</h3>
          <p>Add, edit and manage travel packages</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-right">
              <Link to="/admin/packages/add" className="boxed-btn4">
                + Add Package
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="contact_join">
                <h3 className="text-center">All Packages</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Destination</th>
                        <th>Duration</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No packages found
                          </td>
                        </tr>
                      ) : (
                        packages.map((pkg, index) => (
                          <tr key={pkg.id}>
                            <td>{index + 1}</td>
                            <td>{pkg.title}</td>
                            <td>{pkg.categoryName}</td>
                            <td>{pkg.destination}</td>
                            <td>{pkg.duration}</td>
                            <td>${pkg.price}</td>
                            <td>
                              <button
                                onClick={() =>
                                  handleToggleStatus(pkg.id, pkg.status)
                                }
                                style={{
                                  padding: "3px 12px",
                                  fontSize: "12px",
                                  border: "none",
                                  cursor: "pointer",
                                  background:
                                    pkg.status === "active"
                                      ? "#28a745"
                                      : "#dc3545",
                                  color: "#fff",
                                }}
                              >
                                {pkg.status}
                              </button>
                            </td>
                            <td>
                              <Link
                                to={`/admin/packages/edit/${pkg.id}`}
                                className="boxed-btn3"
                                style={{
                                  padding: "3px 12px",
                                  fontSize: "12px",
                                  border: "none",
                                  cursor: "pointer",
                                  marginRight: "5px",
                                }}
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(pkg.id)}
                                style={{
                                  padding: "3px 12px",
                                  fontSize: "12px",
                                  border: "none",
                                  cursor: "pointer",
                                  background: "#dc3545",
                                  color: "#fff",
                                }}
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

export default ManagePackages;
