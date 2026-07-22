import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CustomRequestService from "../../../services/CustomRequestService";

function ManageCustomRequests() {
  const [fetching, setFetching] = useState(true);
  const [requests, setRequests] = useState([]);

  const loadData = async () => {
    setFetching(true);
    try {
      const data = await CustomRequestService.all();
      setRequests(data);
    } catch (error) {
      console.log(error);
    }
    setFetching(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
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
        await CustomRequestService.update(id, { requestStatus: newStatus });
        toast.success("Status updated successfully");
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
              <h2>CUSTOM REQUESTS</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          <h4 className="mb-4">All Custom Requests</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Painting Title</th>
                <th>Description</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.userName}</td>
                    <td>{item.paintingTitle}</td>
                    <td>{item.description}</td>
                    <td>&#8377;{item.budget}</td>
                    <td>
                      <span
                        className={`badge ${
                          item.requestStatus === "Pending"
                            ? "bg-warning"
                            : item.requestStatus === "Accepted"
                            ? "bg-success"
                            : item.requestStatus === "Rejected"
                            ? "bg-danger"
                            : "bg-info"
                        }`}
                      >
                        {item.requestStatus}
                      </span>
                    </td>
                    <td>
                      {item.requestStatus === "Pending" && (
                        <>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleStatusChange(item.id, "Accepted")}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleStatusChange(item.id, "Rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {item.requestStatus === "Accepted" && (
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => handleStatusChange(item.id, "Completed")}
                        >
                          Complete
                        </button>
                      )}
                      {(item.requestStatus === "Rejected" || item.requestStatus === "Completed") && (
                        <span className="text-muted">No actions</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No custom requests found</td>
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

export default ManageCustomRequests;
