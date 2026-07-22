import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEnrollmentsByStudentId } from "../../../services/firebaseUtils";

function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
    if (!storedUser) {
      toast.error("Please login first");
      nav("/login");
      return;
    }
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoad(true);
      const data = await getEnrollmentsByStudentId(user.uid);
      setEnrollments(data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching enrollments");
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
                <h3>My Enrollments</h3>
              </div>
              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active">My Enrollments</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2>My Enrollments</h2>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event Name</th>
                  <th>Competition Name</th>
                  <th>Enrolled Date</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.length > 0 ? (
                  enrollments.map((enrollment, index) => (
                    <tr key={enrollment.id}>
                      <td>{index + 1}</td>
                      <td>{enrollment.eventName}</td>
                      <td>{enrollment.competitionName}</td>
                      <td>
                        {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Enrollments Found
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

export default MyEnrollments;
