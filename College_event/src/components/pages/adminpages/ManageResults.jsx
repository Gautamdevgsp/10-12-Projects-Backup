import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  getAllCompetitions,
  getResultsByCompetitionId,
  addResult,
  deleteResult,
} from "../../../services/firebaseUtils";

function ManageResults() {
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompId, setSelectedCompId] = useState("");
  const [results, setResults] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [position, setPosition] = useState("");
  const [prize, setPrize] = useState("");

  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    fetchAllCompetitions();
  }, []);

  useEffect(() => {
    if (selectedCompId) {
      fetchResults();
    } else {
      setResults([]);
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

  const fetchResults = async () => {
    try {
      const resultList = await getResultsByCompetitionId(selectedCompId);
      setResults(resultList);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching results");
    }
  };

  const handleAddResult = async (e) => {
    e.preventDefault();

    if (!selectedCompId || !studentName || !position) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoad(true);

      const selectedComp = competitions.find((c) => c.id === selectedCompId);

      const resultData = {
        competitionId: selectedCompId,
        competitionName: selectedComp?.title || "",
        studentName,
        position: parseInt(position),
        prize: prize || "No Prize",
      };

      await addResult(resultData);

      toast.success("Result added successfully");

      setStudentName("");
      setPosition("");
      setPrize("");

      fetchResults();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setLoad(false);
  };

  const handleDeleteResult = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this result!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setLoad(true);
      await deleteResult(id);

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Result deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchResults();
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
                <h3>Manage Results</h3>
              </div>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item active">Manage Results</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-form">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h3>
                  Add <span className="alternate">Results</span>
                </h3>
                <p>Add competition results with positions and prizes.</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAddResult} className="row">
            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Competition</label>
              <select
                className="form-control main p-0"
                   style={{height:"60%"}}
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

            <div className="col-md-6 ">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Position</label>
              <select
                className="form-control main p-0"
                style={{height:"60%"}}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="">Select Position</option>
                <option value="1">1st Position</option>
                <option value="2">2nd Position</option>
                <option value="3">3rd Position</option>
              </select>
            </div>

            <div className="col-md-6 mt-3">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Student Name</label>
              <input
                type="text"
                className="form-control main"
                placeholder="Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div className="col-md-6 mt-3">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Prize</label>
              <input
                type="text"
                className="form-control main"
                placeholder="Prize (Optional)"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
              />
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-main-md">
                Add Result
              </button>
            </div>
          </form>

          {selectedCompId && (
            <>
              <div className="row mt-5">
                <div className="col-12">
                  <h3>Results for Selected Competition</h3>
                </div>
              </div>

              <div className="table-responsive mt-4">
                <table className="table table-bordered table-striped align-middle text-center">
                  <thead>
                    <tr className="text-center">
                      <th>#</th>
                      <th>Position</th>
                      <th>Student Name</th>
                      <th>Prize</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.length > 0 ? (
                      results.map((res, index) => (
                        <tr key={res.id}>
                          <td>{index + 1}</td>
                          <td>{res.position === 1 ? "🥇 1st" : res.position === 2 ? "🥈 2nd" : "🥉 3rd"}</td>
                          <td>{res.studentName}</td>
                          <td>{res.prize}</td>
                          <td>
                            <FaTrash
                              size={18}
                              style={{ cursor: "pointer", color: "#dc3545" }}
                              onClick={() => handleDeleteResult(res.id)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No Results Added</td>
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

export default ManageResults;
