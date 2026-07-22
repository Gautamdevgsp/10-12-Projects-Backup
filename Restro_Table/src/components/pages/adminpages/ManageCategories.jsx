import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [fetching, setFetching] = useState(true);

  async function loadCategories() {
    setFetching(true);
    const data = await CategoryService.all();
    setCategories(data);
    setFetching(false);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const handleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Change status to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      await CategoryService.updateStatus(id, newStatus);
      toast.success("Status updated");
      loadCategories();
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
      await CategoryService.delete(id);
      toast.success("Category deleted");
      loadCategories();
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
            <h5 className="section-title ff-secondary text-start text-primary fw-normal mb-2">Manage Categories</h5>
            <h1 className="mb-0">All Categories</h1>
          </div>
          <Link to="/admin/categories/add" className="btn btn-primary">Add Category</Link>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={cat.imageUrl || "img/category-1.jpg"} alt={cat.name}
                      style={{ width: 60, height: 60, objectFit: "cover" }} className="rounded" />
                  </td>
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                  <td>
                    <button className={`btn btn-sm ${cat.status === "active" ? "btn-success" : "btn-danger"}`}
                      onClick={() => handleStatus(cat.id, cat.status)}>
                      {cat.status}
                    </button>
                  </td>
                  <td>
                    <Link to={`/admin/categories/edit/${cat.id}`} className="btn btn-sm btn-info me-2">Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No categories found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ManageCategories;
