import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEventById, getCompetitionsByEventId } from "../../../services/firebaseUtils";

function EventDetails() {
  const { id } = useParams();
  const nav = useNavigate();

  const [event, setEvent] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetchEventData();
  }, []);

  const fetchEventData = async () => {
    try {
      setLoad(true);
      const eventData = await getEventById(id);
      if (eventData) {
        setEvent(eventData);
        const comps = await getCompetitionsByEventId(id);
        setCompetitions(comps);
      } else {
        toast.error("Event not found");
        nav("/browse-events");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching event details");
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
                <h3>Event Details</h3>
              </div>
              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Event Details</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {event && (
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "20px",
                    }}
                  />
                )}
                <h2 style={{ color: "#FF6B35" }}>{event.title}</h2>
                <p style={{ fontSize: "16px", marginTop: "15px" }}>
                  {event.description}
                </p>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <p><strong>Date:</strong> {event.eventDate}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Time:</strong> {event.eventTime}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Venue:</strong> {event.venue}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Capacity:</strong> {event.capacity} seats</p>
              </div>
              <div className="col-md-6">
                <p><strong>Registration Deadline:</strong> {event.registrationDeadline}</p>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-12">
                <h3>Competitions</h3>
              </div>
            </div>

            <div className="row mt-3">
              {competitions.length > 0 ? (
                competitions.map((comp) => (
                  <div className="col-lg-4 col-md-6 mb-4" key={comp.id}>
                    <div
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {comp.image && (
                        <img
                          src={comp.image}
                          alt={comp.title}
                          style={{
                            width: "100%",
                            height: "180px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <div style={{ padding: "20px" }}>
                        <h4 style={{ marginBottom: "10px", color: "#FF6B35" }}>
                          {comp.title}
                        </h4>
                        <p style={{ fontSize: "14px", color: "#666" }}>
                          {comp.description}
                        </p>
                        <p style={{ fontSize: "14px" }}>
                          <strong>Date:</strong> {comp.competitionDate} | <strong>Time:</strong> {comp.competitionTime}
                        </p>
                        <p style={{ fontSize: "14px" }}>
                          <strong>Venue:</strong> {comp.venue}
                        </p>
                        <p style={{ fontSize: "14px" }}>
                          <strong>Capacity:</strong> {comp.capacity} | <strong>Prize:</strong> {comp.prize || "N/A"}
                        </p>
                        <button
                          className="btn btn-main-md"
                          onClick={() => nav(`/enroll-competition/${comp.id}`)}
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <p style={{ fontSize: "16px", color: "#666" }}>
                    No competitions available for this event
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default EventDetails;
