import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import CategoryService from "../../../services/CategoryService";

function ManageCategories() {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const data = await CategoryService.all();
    setCategories(data);
  }

  useEffect(() => {
    loadCategories();
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
      await CategoryService.delete(id);
      toast.success("Category deleted successfully!");
      loadCategories();
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    await CategoryService.updateStatus(id, newStatus);
    toast.success(`Category ${newStatus} successfully!`);
    loadCategories();
  };

  return (
    <>
      <div className="container" style={{ padding: "40px 0" }}>
        <div className="text-center mb-4">
          <h2>Manage Categories</h2>
          <p className="text-muted">Add, edit and manage food categories</p>
        </div>

        <div className="row mb-3">
          <div className="col-12 text-end">
            <Link to="/admin/categories/add" className="btn-red">
              + Add Category
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="table-wrap">
              <h3>All Categories</h3>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4 text-muted">
                          No categories found
                        </td>
                      </tr>
                    ) : (
                      categories.map((cat, index) => (
                        <tr key={cat.id}>
                          <td>{index + 1}</td>
                          <td>
                            {cat.imageUrl ? (
                              <img src={cat.imageUrl} alt={cat.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }} />
                            ) : (
                              <span className="text-muted" style={{ fontSize: "0.75rem" }}>No image</span>
                            )}
                          </td>
                          <td>{cat.name}</td>
                          <td>{cat.description}</td>
                          <td>
                            <span className={`badge-status ${cat.status}`}>
                              {cat.status}
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/admin/categories/edit/${cat.id}`}
                              className="btn-sm"
                              style={{
                                background: "var(--primary)",
                                color: "#fff",
                                marginRight: "6px",
                              }}
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(cat.id)}
                              className="btn-sm"
                              style={{
                                background: "#dc3545",
                                color: "#fff",
                                border: "none",
                                cursor: "pointer",
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
    </>
  );
}

export default ManageCategories;
