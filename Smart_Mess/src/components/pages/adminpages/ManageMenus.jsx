import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import MenuService from "../../../services/MenuService";

function ManageMenus() {
  const [menus, setMenus] = useState([]);

  const loadMenus = async () => {
    const data = await MenuService.all();
    setMenus(data);
  }

  useEffect(() => {
    loadMenus();
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
      await MenuService.delete(id);
      toast.success("Menu item deleted successfully!");
      loadMenus();
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    await MenuService.updateStatus(id, newStatus);
    toast.success(`Menu ${newStatus} successfully!`);
    loadMenus();
  };

  return (
    <>
      <div className="container" style={{ padding: "40px 0" }}>
        <div className="text-center mb-4">
          <h2>Manage Menu Items</h2>
          <p className="text-muted">Add, edit and manage food menu items</p>
        </div>

        <div className="row mb-3">
          <div className="col-12 text-end">
            <Link to="/admin/menus/add" className="btn-red">
              + Add Menu Item
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="table-wrap">
              <h3>All Menu Items</h3>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menus.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-muted">
                          No menu items found
                        </td>
                      </tr>
                    ) : (
                      menus.map((menu, index) => (
                        <tr key={menu.id}>
                          <td>{index + 1}</td>
                          <td>
                            {menu.imageUrl ? (
                              <img src={menu.imageUrl} alt={menu.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }} />
                            ) : (
                              <span className="text-muted" style={{ fontSize: "0.75rem" }}>No image</span>
                            )}
                          </td>
                          <td>{menu.name}</td>
                          <td>{menu.categoryName}</td>
                          <td>₹{menu.price}</td>
                          <td>
                            <span className={`badge-status ${menu.status}`}>
                              {menu.status}
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/admin/menus/edit/${menu.id}`}
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
                              onClick={() => handleDelete(menu.id)}
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

export default ManageMenus;
