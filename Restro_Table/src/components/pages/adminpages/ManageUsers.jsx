import { useState, useEffect } from "react";
import UserService from "../../../services/UserService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);

  async function loadUsers() {
    setFetching(true);
    const data = await UserService.all();
    setUsers(data);
    setFetching(false);
  }

  useEffect(() => {
    loadUsers();
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
      await UserService.updateStatus(id, newStatus);
      toast.success("User status updated");
      loadUsers();
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
        <div className="mb-4">
          <h5 className="section-title ff-secondary text-start text-primary fw-normal mb-2">Manage Users</h5>
          <h1 className="mb-0">All Users</h1>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={u.id}>
                  <td>{index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.contact || "-"}</td>
                  <td>{u.userType === 1 ? "Admin" : "User"}</td>
                  <td>
                    <span className={`badge ${u.status === "active" ? "bg-success" : "bg-danger"}`}>{u.status}</span>
                  </td>
                  <td>
                    <button className={`btn btn-sm ${u.status === "active" ? "btn-warning" : "btn-success"}`}
                      onClick={() => handleStatus(u.id, u.status)}>
                      {u.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default ManageUsers;
