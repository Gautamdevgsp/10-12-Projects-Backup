import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getAllEnrollments } from "../../../services/firebaseUtils";

function ViewEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetchAllEnrollments();
  }, []);

  const fetchAllEnrollments = async () => {
    try {
      setLoad(true);
      const enrollmentList = await getAllEnrollments();
      setEnrollments(enrollmentList);
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
                <h3>View Enrollments</h3>
              </div>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item active">View Enrollments</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2>All Enrollments</h2>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Event Name</th>
                  <th>Competition Name</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Enrolled Date</th>
                </tr>
              </thead>

              <tbody>
                {enrollments.length > 0 ? (
                  enrollments.map((enrollment, index) => (
                    <tr key={enrollment.id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{enrollment.eventName}</td>
                      <td>{enrollment.competitionName}</td>
                      <td>{enrollment.studentName}</td>
                      <td>{enrollment.email}</td>
                      <td>{enrollment.contact}</td>
                      <td className="text-center">
                        {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
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

export default ViewEnrollments;
