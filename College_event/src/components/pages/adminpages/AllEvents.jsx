import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaTrophy } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getAllEvents, deleteEvent } from "../../../services/firebaseUtils";

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [load, setLoad] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      setLoad(true);
      const eventList = await getAllEvents();
      setEvents(eventList);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching events");
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
      await deleteEvent(id);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Event deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      // Refresh table
      fetchAllEvents();
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
                <h3>Manage Events</h3>
              </div>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">Home</li>

                <li className="breadcrumb-item active">Manage Events</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-6">
              <h2>All Events</h2>
            </div>

            <div className="col-md-6 d-flex justify-content-end">
              <button
                className="btn btn-main-md"
                onClick={() => nav("/admin/createevent")}
              >
                Create Event
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle text-center">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Title</th>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th width="250">Actions</th>
                </tr>
              </thead>

              <tbody>
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <tr key={event.id}>
                      <td>{index + 1}</td>

                      <td>{event.title}</td>

                      <td>{event.venue}</td>

                      <td>{event.eventDate}</td>

                      <td>{event.eventTime}</td>

                      <td>{event.capacity}</td>

                      <td>
                        <span className="badge bg-success">{event.status}</span>
                      </td>
                      <td>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ gap: "25px" }}
                        >
                          <FaTrophy
                            size={20}
                            style={{ cursor: "pointer", color: "#0d6efd" }}
                            title="Competitions"
                            onClick={() =>
                              nav(`/admin/competitions/${event.id}`)
                            }
                          />

                          <FaEdit
                            size={20}
                            style={{ cursor: "pointer", color: "#ffc107" }}
                            title="Edit Event"
                            onClick={() => {
                              nav(`/admin/edit-event/${event.id}`);
                            }}
                          />

                          <FaTrash
                            size={20}
                            style={{ cursor: "pointer", color: "#dc3545" }}
                            title="Delete Event"
                            onClick={() => {
                              handleDelete(event.id, event.title)
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No Events Found
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

export default AllEvents;
