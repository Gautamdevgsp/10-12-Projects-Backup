import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TableService from "../../../services/MenuService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

function ManageMenu() {
  const [tables, setTables] = useState([]);
  const [fetching, setFetching] = useState(true);

  async function loadTables() {
    setFetching(true);
    const data = await TableService.all();
    setTables(data);
    setFetching(false);
  }

  useEffect(() => {
    loadTables();
  }, []);

  const handleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "available" ? "unavailable" : "available";
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Change status to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      await TableService.updateStatus(id, newStatus);
      toast.success("Status updated");
      loadTables();
    }
  };

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
      await TableService.delete(id);
      toast.success("Table deleted");
      loadTables();
    }
  };

  if (fetching) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <HashLoader size={80} color="#0F172B" />
      </div>
    );
  }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="section-title ff-secondary text-start text-primary fw-normal mb-2">Manage Tables</h5>
            <h1 className="mb-0">All Tables</h1>
          </div>
          <Link to="/admin/tables/add" className="btn btn-primary">Add Table</Link>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Table No.</th>
                <th>Capacity</th>
                <th>Rate/Hour</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((t, index) => (
                <tr key={t.id}>
                  <td>{index + 1}</td>
                  <td><img src={t.imageUrl || "img/table-placeholder.jpg"} alt="" style={{ width: 50, height: 40, objectFit: "cover" }} className="rounded" /></td>
                  <td><strong>Table {t.tableNumber}</strong></td>
                  <td>{t.capacity} guests</td>
                  <td>{t.ratePerHour ? `₹${t.ratePerHour}` : "-"}</td>
                  <td>{t.categoryName || "-"}</td>
                  <td>
                    <button className={`btn btn-sm ${t.status === "available" ? "btn-success" : "btn-danger"}`}
                      onClick={() => handleStatus(t.id, t.status)}>
                      {t.status}
                    </button>
                  </td>
                  <td>
                    <Link to={`/admin/tables/edit/${t.id}`} className="btn btn-sm btn-info me-2">Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {tables.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">No tables found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ManageMenu;
