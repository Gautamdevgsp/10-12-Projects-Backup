import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getActiveEvents } from "../../../services/firebaseUtils";

function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    fetchActiveEvents();
  }, []);

  const fetchActiveEvents = async () => {
    try {
      setLoad(true);
      const eventList = await getActiveEvents();
      setEvents(eventList);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching events");
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
                <h3>Browse Events</h3>
              </div>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>

                <li className="breadcrumb-item active">Browse Events</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2>Upcoming Events</h2>
            </div>
          </div>

          <div className="row">
            {events.length > 0 ? (
              events.map((event) => (
                <div className="col-lg-4 col-md-6 mb-4" key={event.id}>
                  <div
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    <div style={{ padding: "20px" }}>
                      {event.image && (
                        <img
                          src={event.image}
                          alt={event.title}
                          style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginBottom: "15px",
                          }}
                        />
                      )}
                      <h4 style={{ marginBottom: "10px", color: "#FF6B35" }}>
                        {event.title}
                      </h4>

                      <p style={{ marginBottom: "10px", fontSize: "14px" }}>
                        <strong>📅 Date:</strong> {event.eventDate}
                      </p>

                      <p style={{ marginBottom: "10px", fontSize: "14px" }}>
                        <strong>⏰ Time:</strong> {event.eventTime}
                      </p>

                      <p style={{ marginBottom: "10px", fontSize: "14px" }}>
                        <strong>📍 Venue:</strong> {event.venue}
                      </p>

                      <p style={{ marginBottom: "15px", fontSize: "14px" }}>
                        <strong>👥 Capacity:</strong> {event.capacity} seats
                      </p>

                      <p style={{ marginBottom: "15px", fontSize: "13px", color: "#666" }}>
                        {event.description.substring(0, 80)}...
                      </p>

                      <button
                        className="btn btn-main-md"
                        onClick={() => nav(`/event/${event.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p style={{ fontSize: "18px", color: "#666" }}>
                  No active events available
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default BrowseEvents;
