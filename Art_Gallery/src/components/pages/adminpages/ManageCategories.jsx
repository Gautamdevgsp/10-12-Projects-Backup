import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CategoryService from "../../../services/CategoryService";
import ToggleSwitch from "../../common/ToggleSwitch";

function ManageCategories() {
  const [fetching, setFetching] = useState(true);
  const [categories, setCategories] = useState([]);

  const loadData = async () => {
    setFetching(true);
    try {
      const data = await CategoryService.all();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
    setFetching(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusToggle = async (id, currentStatus) => {
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
      try {
        await CategoryService.updateStatus(id, newStatus);
        toast.success("Status updated successfully");
        loadData();
      } catch (error) {
        toast.error("Something went wrong");
      }
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
      try {
        await CategoryService.delete(id);
        toast.success("Deleted successfully");
        loadData();
      } catch (error) {
        toast.error("Something went wrong");
      }
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
    <>
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.9"
            data-stellar-vertical-offset={0}
          />
          <div className="container">
            <div className="banner_content text-center">
              <h2>MANAGE CATEGORIES</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">All Categories</h4>
            <Link to="/admin/add-category" className="btn submit_btn">
              Add Category
            </Link>
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
                {categories.length > 0 ? (
                  categories.map((cat, index) => (
                    <tr key={cat.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={cat.image || "/img/banner/banner.jpg"}
                          alt={cat.name}
                          style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                        />
                      </td>
                      <td>{cat.name}</td>
                      <td>{cat.description || "-"}</td>
                      <td>
                        <ToggleSwitch
                          checked={cat.status === "active"}
                          onChange={() => handleStatusToggle(cat.id, cat.status)}
                          label={cat.status === "active" ? "Active" : "Inactive"}
                        />
                      </td>
                      <td>
                        <Link to={`/admin/edit-category/${cat.id}`} className="btn btn-sm btn-primary me-2">
                          Edit
                        </Link>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No categories found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default ManageCategories;
