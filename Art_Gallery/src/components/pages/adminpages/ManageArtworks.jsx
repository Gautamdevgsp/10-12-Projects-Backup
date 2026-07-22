import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ArtworkService from "../../../services/ArtworkService";
import ToggleSwitch from "../../common/ToggleSwitch";

function ManageArtworks() {
  const [fetching, setFetching] = useState(true);
  const [artworks, setArtworks] = useState([]);

  const loadData = async () => {
    setFetching(true);
    try {
      const data = await ArtworkService.all();
      setArtworks(data);
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
        await ArtworkService.updateStatus(id, newStatus);
        toast.success("Status updated successfully");
        loadData();
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const handleAvailabilityToggle = async (id, currentAvailability) => {
    const newAvailability = currentAvailability === "Available" ? "Sold Out" : "Available";
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Change availability to ${newAvailability}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        await ArtworkService.update(id, { availability: newAvailability });
        toast.success("Availability updated successfully");
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
        await ArtworkService.delete(id);
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
              <h2>MANAGE ARTWORKS</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">All Artworks</h4>
            <Link to="/admin/add-artwork" className="btn submit_btn">
              Add Artwork
            </Link>
          </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Price</th>
                <th>Category</th>
                <th>Availability</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {artworks.length > 0 ? (
                artworks.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.artistName}</td>
                    <td>&#8377;{item.price}</td>
                    <td>{item.categoryName}</td>
                    <td>
                      <ToggleSwitch
                        checked={item.availability === "Available"}
                        onChange={() => handleAvailabilityToggle(item.id, item.availability)}
                        label={item.availability}
                      />
                    </td>
                    <td>
                      <ToggleSwitch
                        checked={item.status === "active"}
                        onChange={() => handleStatusToggle(item.id, item.status)}
                        label={item.status === "active" ? "Active" : "Inactive"}
                      />
                    </td>
                    <td>
                      <Link to={`/admin/edit-artwork/${item.id}`} className="btn btn-sm btn-primary me-2">
                        Edit
                      </Link>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">No artworks found</td>
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

export default ManageArtworks;
