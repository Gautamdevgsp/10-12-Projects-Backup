import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getAllCompetitions, getCompetitionsByEventId, deleteCompetition } from "../../../services/firebaseUtils";

function ManageCompetitions() {
  const { eventId } = useParams();
  const [competitions, setCompetitions] = useState([]);
  const [load, setLoad] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    fetchAllCompetitions();
  }, []);

  const fetchAllCompetitions = async () => {
    try {
      setLoad(true);
      const competitionList = eventId
        ? await getCompetitionsByEventId(eventId)
        : await getAllCompetitions();
      setCompetitions(competitionList);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching competitions");
    }
    setLoad(false);
  };

  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to recover ${title}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setLoad(true);
      await deleteCompetition(id);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Competition deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchAllCompetitions();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }

    setLoad(false);
  };

  return (
    <>
      {load && (
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
            zIndex: "9999",
          }}
        >
          <RingLoader size={100} color="#FF6B35" />
        </div>
      )}

      <section className="page-title bg-title overlay-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="title">
                <h3>{eventId ? "Event Competitions" : "Manage Competitions"}</h3>
              </div>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item active">{eventId ? "Event Competitions" : "Manage Competitions"}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-6">
              <h2>{eventId ? "Competitions for this Event" : "All Competitions"}</h2>
            </div>

            {!eventId && (
            <div className="col-md-6 d-flex justify-content-end">
              <button
                className="btn btn-main-md"
                onClick={() => nav("/admin/createcompetition")}
              >
                Create Competition
              </button>
            </div>
            )}
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle text-center">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Event</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Capacity</th>
                  <th>Prize</th>
                  <th>Status</th>
                  <th width="150">Actions</th>
                </tr>
              </thead>

              <tbody>
                {competitions.length > 0 ? (
                  competitions.map((comp, index) => (
                    <tr key={comp.id}>
                      <td>{index + 1}</td>
                      <td>{comp.eventName}</td>
                      <td>{comp.title}</td>
                      <td>{comp.competitionDate}</td>
                      <td>{comp.venue}</td>
                      <td>{comp.capacity}</td>
                      <td>{comp.prize || "-"}</td>
                      <td>
                        <span className="badge bg-success">{comp.status}</span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
                          <FaEdit
                            size={18}
                            style={{ cursor: "pointer", color: "#ffc107" }}
                            title="Edit"
                            onClick={() => nav(`/admin/edit-competition/${comp.id}`)}
                          />

                          <FaTrash
                            size={18}
                            style={{ cursor: "pointer", color: "#dc3545" }}
                            title="Delete"
                            onClick={() => handleDelete(comp.id, comp.title)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No Competitions Found
                    </td>
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

export default ManageCompetitions;
