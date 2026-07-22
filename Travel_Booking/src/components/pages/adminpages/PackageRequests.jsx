import { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import PackageRequestService from "../../../services/PackageRequestService";
import PackageService from "../../../services/PackageService";
import CategoryService from "../../../services/CategoryService";
import CloudinaryService from "../../../services/CloudinaryService";

Modal.setAppElement("#root");

function PackageRequests() {
  const [requests, setRequests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [load, setLoad] = useState(false);

  async function loadRequests() {
    const data = await PackageRequestService.all();
    setRequests(data);
  }

  useEffect(() => {
    loadRequests();
  }, []);

  const openCreateModal = (req) => {
    setSelectedReq(req);
    setTitle(req.destination + " Trip");
    setDescription(req.requirements);
    setDestination(req.destination);
    setDuration(req.days + " Days");
    setPrice("");
    setImageFile(null);
    setModalOpen(true);
  };

  const closeCreateModal = () => {
    setModalOpen(false);
    setSelectedReq(null);
  };

  const handleAccept = async (id) => {
    const result = await Swal.fire({
      title: "Accept Request?",
      text: "This will mark the request as Approved.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Accept",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await PackageRequestService.updateStatus(id, "Approved");
      toast.success("Request accepted!");
      loadRequests();
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject Request?",
      text: "This will mark the request as Rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await PackageRequestService.updateStatus(id, "Rejected");
      toast.success("Request rejected!");
      loadRequests();
    }
  };

  const handleCreatePackage = async (e) => {
    e.preventDefault();

    if (
      title.trim() === "" ||
      description.trim() === "" ||
      destination.trim() === "" ||
      duration.trim() === "" ||
      price.trim() === ""
    ) {
      toast.error("All fields are required!");
      return;
    }

    setLoad(true);

    let imageUrl = "";
    if (imageFile) {
      setUploading(true);
      imageUrl = await CloudinaryService.upload(imageFile);
      setUploading(false);
      if (!imageUrl) {
        setLoad(false);
        return;
      }
    }

    try {
      const categories = await CategoryService.all();
      let catId = "";
      if (categories.length > 0) {
        catId = categories[0].id;
      }

      await PackageService.add({
        categoryId: catId,
        categoryName: categories.length > 0 ? categories[0].name : "",
        title,
        description,
        destination,
        duration,
        price,
        imageUrl: imageUrl || "",
        status: "active",
        createdAt: new Date().toISOString(),
      });

      await PackageRequestService.updateStatus(selectedReq.id, "Approved");

      toast.success("Package created from request successfully!");
      closeCreateModal();
      loadRequests();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      {(load || uploading) && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "99999",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <HashLoader size={100} color="#FF4A52" />
            {uploading && (
              <p style={{ color: "#fff", marginTop: "15px" }}>
                Uploading image...
              </p>
            )}
          </div>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeCreateModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: "9999",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "550px",
            maxWidth: "95%",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "0",
            border: "none",
            borderRadius: "8px",
          },
        }}
      >
        <div style={{ padding: "30px" }}>
          <h3
            style={{
              fontSize: "22px",
              fontWeight: 500,
              color: "#001D38",
              marginBottom: "25px",
              textAlign: "center",
            }}
          >
            Create Package from Request
          </h3>

          <form onSubmit={handleCreatePackage}>
            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#001D38",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Package Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #e4e6e8",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#001D38",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #e4e6e8",
                  borderRadius: "4px",
                  fontSize: "14px",
                  resize: "vertical",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginBottom: "18px",
              }}
            >
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#001D38",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "1px solid #e4e6e8",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#001D38",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "1px solid #e4e6e8",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginBottom: "18px",
              }}
            >
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#001D38",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    border: "1px solid #e4e6e8",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#001D38",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    border: "1px solid #e4e6e8",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                type="button"
                onClick={closeCreateModal}
                style={{
                  padding: "12px 30px",
                  border: "1px solid #e4e6e8",
                  borderRadius: "4px",
                  background: "#fff",
                  color: "#666",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="boxed-btn4"
                style={{
                  padding: "12px 30px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Create Package
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>Package Requests</h3>
          <p>Manage customer package requests</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contact_join">
                <h3 className="text-center">All Requests</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Destination</th>
                        <th>Budget</th>
                        <th>Days</th>
                        <th>Requirements</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="text-center">
                            No requests found
                          </td>
                        </tr>
                      ) : (
                        requests.map((req, index) => (
                          <tr key={req.id}>
                            <td>{index + 1}</td>
                            <td>{req.userName}</td>
                            <td>{req.email}</td>
                            <td>{req.contact}</td>
                            <td>{req.destination}</td>
                            <td>${req.budget}</td>
                            <td>{req.days}</td>
                            <td>{req.requirements}</td>
                            <td>
                              <span
                                style={{
                                  padding: "3px 12px",
                                  fontSize: "12px",
                                  background:
                                    req.status === "Approved"
                                      ? "#28a745"
                                      : req.status === "Rejected"
                                      ? "#dc3545"
                                      : "#ffc107",
                                  color: "#fff",
                                  borderRadius: "4px",
                                }}
                              >
                                {req.status}
                              </span>
                            </td>
                            <td>
                              {req.status === "Pending" && (
                                <>
                                  <button
                                    onClick={() => handleAccept(req.id)}
                                    style={{
                                      padding: "3px 12px",
                                      fontSize: "12px",
                                      border: "none",
                                      cursor: "pointer",
                                      background: "#28a745",
                                      color: "#fff",
                                      borderRadius: "4px",
                                      marginRight: "5px",
                                    }}
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() => handleReject(req.id)}
                                    style={{
                                      padding: "3px 12px",
                                      fontSize: "12px",
                                      border: "none",
                                      cursor: "pointer",
                                      background: "#dc3545",
                                      color: "#fff",
                                      borderRadius: "4px",
                                      marginRight: "5px",
                                    }}
                                  >
                                    Reject
                                  </button>
                                  <button
                                    className="boxed-btn3"
                                    onClick={() => openCreateModal(req)}
                                    style={{
                                      padding: "3px 12px",
                                      fontSize: "12px",
                                      border: "none",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Create Package
                                  </button>
                                </>
                              )}
                              {req.status !== "Pending" && (
                                <span style={{ fontSize: "12px", color: "#999" }}>
                                  {req.status === "Approved" ? "Approved" : "Rejected"}
                                </span>
                              )}
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

export default PackageRequests;
