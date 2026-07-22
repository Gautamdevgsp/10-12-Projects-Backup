import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ReviewService from "../../../services/ReviewService";
import ToggleSwitch from "../../common/ToggleSwitch";

function ManageReviews() {
  const [fetching, setFetching] = useState(true);
  const [reviews, setReviews] = useState([]);

  const loadData = async () => {
    setFetching(true);
    try {
      const data = await ReviewService.all();
      setReviews(data);
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
        await ReviewService.updateStatus(id, newStatus);
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
        await ReviewService.delete(id);
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
              <h2>MANAGE REVIEWS</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          <h4 className="mb-4">All Reviews</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Artwork ID</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? (
                reviews.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.userName}</td>
                    <td>{item.artworkId}</td>
                    <td>{item.rating} ★</td>
                    <td>{item.review}</td>
                    <td>
                      <ToggleSwitch
                        checked={item.status === "active"}
                        onChange={() => handleStatusToggle(item.id, item.status)}
                        label={item.status === "active" ? "Active" : "Inactive"}
                      />
                    </td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No reviews found</td>
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

export default ManageReviews;
