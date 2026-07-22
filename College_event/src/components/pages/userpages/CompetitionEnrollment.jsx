import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCompetitionById, getEventById, checkEnrollmentExists, createEnrollment } from "../../../services/firebaseUtils";

function CompetitionEnrollment() {
  const { id } = useParams();
  const nav = useNavigate();

  const [competition, setCompetition] = useState(null);
  const [event, setEvent] = useState(null);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [load, setLoad] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
    if (!storedUser) {
      toast.error("Please login first");
      nav("/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoad(true);
      const compData = await getCompetitionById(id);
      if (!compData) {
        toast.error("Competition not found");
        nav("/browse-events");
        return;
      }
      setCompetition(compData);

      if (compData.eventId) {
        const eventData = await getEventById(compData.eventId);
        setEvent(eventData);
      }

      if (user.uid) {
        const exists = await checkEnrollmentExists(user.uid, id);
        setAlreadyEnrolled(exists);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching competition details");
    }
    setLoad(false);
  };

  const handleEnroll = async () => {
    try {
      setEnrolling(true);

      if (alreadyEnrolled) {
        toast.error("You are already enrolled in this competition");
        return;
      }

      const enrollmentData = {
        eventId: competition.eventId,
        eventName: event?.title || competition.eventName || "",
        competitionId: competition.id,
        competitionName: competition.title,
        studentId: user.uid,
        studentName: user.name,
        email: user.email,
        contact: user.contact || "",
      };

      await createEnrollment(enrollmentData);

      toast.success("Successfully enrolled in the competition!");
      setAlreadyEnrolled(true);

      setTimeout(() => {
        nav("/my-enrollments");
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setEnrolling(false);
  };

  return (
    <>
      {(load || enrolling) && (
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
                <h3>Competition Enrollment</h3>
              </div>
              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">Enrollment</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {competition && (
        <section className="section contact-form">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h3>
                    Enroll in <span className="alternate">{competition.title}</span>
                  </h3>
                  <p>Review the competition details and confirm your enrollment.</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 mx-auto">
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "30px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h4 style={{ color: "#FF6B35", marginBottom: "20px" }}>
                    {competition.title}
                  </h4>
                  <p>{competition.description}</p>

                  <div className="row mt-4">
                    <div className="col-md-6">
                      <p><strong>Event:</strong> {event?.title || competition.eventName}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Date:</strong> {competition.competitionDate}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Time:</strong> {competition.competitionTime}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Venue:</strong> {competition.venue}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Capacity:</strong> {competition.capacity}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Prize:</strong> {competition.prize || "N/A"}</p>
                    </div>
                  </div>

                  <hr />

                  <h5>Your Information</h5>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p><strong>Name:</strong> {user.name}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Email:</strong> {user.email}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Contact:</strong> {user.contact || "N/A"}</p>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    {alreadyEnrolled ? (
                      <div>
                        <p style={{ color: "#28a745", fontWeight: "bold", fontSize: "18px" }}>
                          You are already enrolled in this competition
                        </p>
                        <button
                          className="btn btn-main-md"
                          onClick={() => nav("/my-enrollments")}
                        >
                          View My Enrollments
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-main-md"
                        onClick={handleEnroll}
                        disabled={enrolling}
                      >
                        Confirm Enrollment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default CompetitionEnrollment;
