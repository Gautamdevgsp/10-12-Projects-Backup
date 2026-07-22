import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import CategoryService from "../../../services/CategoryService";

function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const nav = useNavigate();

  async function loadCategories() {
    const data = await CategoryService.all();
    setCategories(data);
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      nav("/login");
      return;
    }
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
    const result = await Swal.fire({
      title: "Change Status?",
      text: `This will mark the category as ${newStatus}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await CategoryService.updateStatus(id, newStatus);
      toast.success(`Category ${newStatus} successfully!`);
      loadCategories();
    }
  };

  return (
    <>
      <div className="page_banner">
        <div className="container">
          <h1>Manage Vehicle Categories</h1>
          <p>Add, edit and manage vehicle categories</p>
        </div>
      </div>

      <div className="about_section layout_padding">
        <div className="container">
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-12 text-right">
              <Link to="/admin/categories/add" className="action_btn">
                + Add Category
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="form_wrap">
                <h3>All Categories</h3>
                <div className="table_wrap">
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
                          <td colSpan="6" className="text-center">
                            No categories found
                          </td>
                        </tr>
                      ) : (
                        categories.map((cat, index) => (
                          <tr key={cat.id}>
                            <td>{index + 1}</td>
                            <td>
                              {cat.imageUrl ? (
                                <img src={cat.imageUrl} alt={cat.name} style={{ width: "60px", height: "45px", objectFit: "cover", borderRadius: "4px" }} />
                              ) : (
                                <span style={{ color: "#999", fontSize: "12px" }}>No image</span>
                              )}
                            </td>
                            <td>{cat.name}</td>
                            <td>{cat.description}</td>
                            <td>
                              <button
                                onClick={() => handleToggleStatus(cat.id, cat.status)}
                                className={`status_badge ${cat.status}`}
                              >
                                {cat.status}
                              </button>
                            </td>
                            <td>
                              <Link
                                to={`/admin/categories/edit/${cat.id}`}
                                className="action_btn action_btn_sm"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(cat.id)}
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

export default ManageCategory;
