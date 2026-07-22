import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  getAllCompetitions,
  getEnrollmentsByCompetitionId,
  getCertificatesByCompetitionId,
  createCertificate,
  deleteCertificate,
  getCompetitionById,
  getEventById,
} from "../../../services/firebaseUtils";

function IssueCertificates() {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompId, setSelectedCompId] = useState("");
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [position, setPosition] = useState("");

  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetchAllCompetitions();
  }, []);

  useEffect(() => {
    if (selectedCompId) {
      fetchEnrolledStudents();
      fetchCertificates();
      setSelectedStudent("");
      setPosition("");
    } else {
      setEnrolledStudents([]);
      setCertificates([]);
    }
  }, [selectedCompId]);

  const fetchAllCompetitions = async () => {
    try {
      setLoad(true);
      const compList = await getAllCompetitions();
      setCompetitions(compList);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching competitions");
    }
    setLoad(false);
  };

  const fetchEnrolledStudents = async () => {
    try {
      const enrollments = await getEnrollmentsByCompetitionId(selectedCompId);
      setEnrolledStudents(enrollments);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching enrolled students");
    }
  };

  const fetchCertificates = async () => {
    try {
      const certList = await getCertificatesByCompetitionId(selectedCompId);
      setCertificates(certList);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching certificates");
    }
  };

  const handleIssueCertificate = async () => {
    if (!selectedStudent) {
      toast.error("Please select a student");
      return;
    }
    if (!position) {
      toast.error("Please select a position");
      return;
    }

    try {
      setLoad(true);

      const enrollment = enrolledStudents.find(
        (e) => e.studentId === selectedStudent
      );
      const selectedComp = competitions.find((c) => c.id === selectedCompId);
      const certificateNo = "CERT-" + Date.now();

      let eventDate = "";
      let eventTime = "";
      let venue = "";

      try {
        const compData = await getCompetitionById(selectedCompId);
        if (compData) {
          eventDate = compData.competitionDate || "";
          eventTime = compData.competitionTime || "";
          venue = compData.venue || "";
        }
        if (selectedComp?.eventId) {
          const eventData = await getEventById(selectedComp.eventId);
          if (eventData) {
            eventDate = eventDate || eventData.eventDate || "";
            eventTime = eventTime || eventData.eventTime || "";
            venue = venue || eventData.venue || "";
          }
        }
      } catch (e) {
        console.log(e);
      }

      const certData = {
        certificateNo,
        studentId: selectedStudent,
        studentName: enrollment?.studentName || "",
        competitionId: selectedCompId,
        competitionName: selectedComp?.title || "",
        eventId: selectedComp?.eventId || "",
        eventName: selectedComp?.eventName || "",
        position: Number(position),
        eventDate,
        eventTime,
        venue,
      };

      await createCertificate(certData);

      toast.success("Certificate issued successfully");

      fetchCertificates();
      setSelectedStudent("");
      setPosition("");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setLoad(false);
  };

  const handleDeleteCertificate = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this certificate!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setLoad(true);
      await deleteCertificate(id);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Certificate deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchCertificates();
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
                <h3>Issue E-Certificates</h3>
              </div>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item active">Issue E-Certificates</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h3>Select Competition</h3>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Competition</label>
              <select
                 style={{height:"60%"}}
                className="form-control main"
                value={selectedCompId}
                onChange={(e) => setSelectedCompId(e.target.value)}
              >
                <option value="">Select Competition</option>
                {competitions.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.eventName} - {comp.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedCompId && (
            <>
              <div className="row mb-4">
                <div className="col-12">
                  <h3>Issue New Certificate</h3>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Select Student</label>
                  <select
                     style={{height:"60%"}}
                    className="form-control main"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                  >
                    <option value="">-- Select Enrolled Student --</option>
                    {enrolledStudents.map((enr) => (
                      <option key={enr.studentId} value={enr.studentId}>
                        {enr.studentName} ({enr.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Position</label>
                  <select
                     style={{height:"60%"}}
                    className="form-control main"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="">Select Position</option>
                    <option value="1">1st Position</option>
                    <option value="2">2nd Position</option>
                    <option value="3">3rd Position</option>
                  </select>
                </div>

                <div className="col-md-3 d-flex align-items-center mt-4">
                  <button
                    className="btn btn-main-md"
                    onClick={handleIssueCertificate}
                    style={{ width: "100%" }}
                  >
                    Issue Certificate
                  </button>
                </div>
              </div>

              <div className="row mb-4 mt-5">
                <div className="col-12">
                  <h3>Issued Certificates</h3>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle">
                  <thead>
                    <tr className="text-center">
                      <th>#</th>
                      <th>Certificate No</th>
                      <th>Student Name</th>
                      <th>Position</th>
                      <th>Issued Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {certificates.length > 0 ? (
                      certificates.map((cert, index) => (
                        <tr key={cert.id}>
                          <td className="text-center">{index + 1}</td>
                          <td>{cert.certificateNo}</td>
                          <td>{cert.studentName}</td>
                          <td className="text-center">
                            {cert.position === 1 ? "🥇 1st" : cert.position === 2 ? "🥈 2nd" : "🥉 3rd"}
                          </td>
                          <td className="text-center">
                            {new Date(cert.issueDate).toLocaleDateString()}
                          </td>
                          <td className="text-center">
                            <FaTrash
                              size={18}
                              style={{ cursor: "pointer", color: "#dc3545" }}
                              onClick={() => handleDeleteCertificate(cert.id)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No Certificates Issued
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default IssueCertificates;
