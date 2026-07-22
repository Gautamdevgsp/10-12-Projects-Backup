import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import CategoryService from "../../../services/CategoryService";

function ManageCategories() {
  const [categories, setCategories] = useState([]);

  async function loadCategories() {
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
      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>Manage Categories</h3>
          <p>Add, edit and manage travel categories</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 text-right">
              <Link to="/admin/categories/add" className="boxed-btn4">
                + Add Category
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="contact_join">
                <h3 className="text-center">All Categories</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No categories found
                          </td>
                        </tr>
                      ) : (
                        categories.map((cat, index) => (
                          <tr key={cat.id}>
                            <td>{index + 1}</td>
                            <td>{cat.name}</td>
                            <td>{cat.description}</td>
                            <td>
                              <button
                                className={`boxed-btn3 ${
                                  cat.status === "active"
                                    ? ""
                                    : ""
                                }`}
                                onClick={() =>
                                  handleToggleStatus(cat.id, cat.status)
                                }
                                style={{
                                  padding: "3px 12px",
                                  fontSize: "12px",
                                  border: "none",
                                  cursor: "pointer",
                                  background:
                                    cat.status === "active"
                                      ? "#28a745"
                                      : "#dc3545",
                                  color: "#fff",
                                }}
                              >
                                {cat.status}
                              </button>
                            </td>
                            <td>
                              <Link
                                to={`/admin/categories/edit/${cat.id}`}
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
                                className="boxed-btn3"
                                onClick={() => handleDelete(cat.id)}
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

export default ManageCategories;
