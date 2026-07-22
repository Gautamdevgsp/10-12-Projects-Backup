import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getDashboardStats } from "../../../services/firebaseUtils";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalCompetitions: 0,
    totalEnrollments: 0,
    totalCertificates: 0,
  });
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoad(true);
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching statistics");
    }
    setLoad(false);
  };

  const StatCard = ({ icon, title, count, color }) => (
    <div className="col-md-6 col-lg-3 mb-4">
      <div
        style={{
          backgroundColor: color,
          borderRadius: "10px",
          padding: "30px",
          textAlign: "center",
          color: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "10px" }}>{icon}</div>
        <h3 style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0" }}>
          {count}
        </h3>
        <p style={{ fontSize: "16px", margin: "0" }}>{title}</p>
      </div>
    </div>
  );

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
                <h3>Dashboard Reports</h3>
              </div>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item active">Reports</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <h2>Overview</h2>
              <p>Get a quick overview of all your events and activities.</p>
            </div>
          </div>

          <div className="row">
            <StatCard
              icon="📅"
              title="Total Events"
              count={stats.totalEvents}
              color="#FF6B35"
            />
            <StatCard
              icon="🏆"
              title="Total Competitions"
              count={stats.totalCompetitions}
              color="#0066cc"
            />
            <StatCard
              icon="👥"
              title="Total Enrollments"
              count={stats.totalEnrollments}
              color="#28a745"
            />
            <StatCard
              icon="📜"
              title="Total Certificates"
              count={stats.totalCertificates}
              color="#6f42c1"
            />
          </div>

          <div className="row mt-5">
            <div className="col-12">
              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "10px",
                  padding: "30px",
                  marginTop: "20px",
                }}
              >
                <h3>Quick Statistics</h3>
                <ul style={{ fontSize: "16px", lineHeight: "2" }}>
                  <li>
                    <strong>Events Organized:</strong> {stats.totalEvents}
                  </li>
                  <li>
                    <strong>Competitions Hosted:</strong>{" "}
                    {stats.totalCompetitions}
                  </li>
                  <li>
                    <strong>Students Enrolled:</strong> {stats.totalEnrollments}
                  </li>
                  <li>
                    <strong>Certificates Issued:</strong> {stats.totalCertificates}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
