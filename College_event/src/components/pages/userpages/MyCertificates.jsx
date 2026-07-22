import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCertificatesByStudentId } from "../../../services/firebaseUtils";

function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
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
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoad(true);
      const data = await getCertificatesByStudentId(user.uid);
      setCertificates(data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching certificates");
    }
    setLoad(false);
  };

  const handleDownload = (cert) => {
    const win = window.open("", "_blank");
    const positionText =
      cert.position === 1
        ? "1st"
        : cert.position === 2
        ? "2nd"
        : "3rd";

    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Certificate - ${cert.certificateNo}</title>
        <style>
          @page { margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Georgia', 'Times New Roman', serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #f0f0f0;
          }
          .certificate-wrapper {
            width: 900px;
            min-height: 640px;
            background: #fff;
            padding: 40px;
            position: relative;
            border: 15px solid #FF6B35;
            box-shadow: 0 0 30px rgba(0,0,0,0.15);
          }
          .certificate-wrapper::before {
            content: '';
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            border: 2px solid #FF6B35;
            pointer-events: none;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            font-size: 42px;
            color: #FF6B35;
            letter-spacing: 4px;
            text-transform: uppercase;
            font-weight: bold;
          }
          .header .subtitle {
            font-size: 16px;
            color: #888;
            margin-top: 5px;
            letter-spacing: 2px;
          }
          .divider {
            width: 60%;
            height: 2px;
            background: #FF6B35;
            margin: 15px auto;
          }
          .body-text {
            text-align: center;
            font-size: 18px;
            color: #555;
            line-height: 1.8;
            margin: 30px 0;
          }
          .body-text .student-name {
            font-size: 36px;
            font-weight: bold;
            color: #222;
            margin: 15px 0;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .body-text .detail {
            font-size: 20px;
            color: #333;
            margin: 5px 0;
          }
          .body-text .position-badge {
            display: inline-block;
            font-size: 28px;
            font-weight: bold;
            color: #FF6B35;
            border: 3px solid #FF6B35;
            padding: 8px 30px;
            border-radius: 50px;
            margin: 15px 0;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
            padding: 0 20px;
          }
          .info-row .info-item {
            text-align: center;
          }
          .info-row .info-item .label {
            font-size: 12px;
            color: #999;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .info-row .info-item .value {
            font-size: 16px;
            color: #333;
            font-weight: bold;
            margin-top: 5px;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 12px;
            color: #aaa;
          }
          .cert-no {
            position: absolute;
            bottom: 25px;
            right: 35px;
            font-size: 11px;
            color: #bbb;
          }
          @media print {
            body { background: #fff; }
            .certificate-wrapper { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="certificate-wrapper">
          <div class="header">
            <h1>Certificate of Achievement</h1>
            <div class="subtitle">This certificate is proudly presented to</div>
          </div>

          <div class="divider"></div>

          <div class="body-text">
            <div class="student-name">${cert.studentName}</div>
            <div class="detail">for securing</div>
            <div class="position-badge">${positionText} Position</div>
            <div class="detail">in the competition</div>
            <div class="detail" style="font-size:24px; font-weight:bold; color:#FF6B35; margin-top:10px;">
              ${cert.competitionName || ""}
            </div>
            ${cert.eventName ? `<div class="detail" style="font-size:18px; color:#555;">Event: ${cert.eventName}</div>` : ""}
          </div>

          <div class="info-row">
            ${cert.eventDate ? `<div class="info-item"><div class="label">Date</div><div class="value">${cert.eventDate}</div></div>` : ""}
            ${cert.eventTime ? `<div class="info-item"><div class="label">Time</div><div class="value">${cert.eventTime}</div></div>` : ""}
            ${cert.venue ? `<div class="info-item"><div class="label">Venue</div><div class="value">${cert.venue}</div></div>` : ""}
            <div class="info-item">
              <div class="label">Issue Date</div>
              <div class="value">${new Date(cert.issueDate).toLocaleDateString()}</div>
            </div>
          </div>

          <div class="divider" style="margin-top: 30px;"></div>

          <div class="footer">
            This is a computer-generated certificate.
          </div>

          <div class="cert-no">${cert.certificateNo}</div>
        </div>
        <script>
          window.onload = function() { window.print(); };
        <\/script>
      </body>
      </html>
    `);
    win.document.close();
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
                <h3>My Certificates</h3>
              </div>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>

                <li className="breadcrumb-item active">My Certificates</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2>Download Certificates</h2>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Certificate No</th>
                  <th>Competition</th>
                  <th>Position</th>
                  <th>Issue Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {certificates.length > 0 ? (
                  certificates.map((cert, index) => (
                    <tr key={cert.id}>
                      <td>{index + 1}</td>
                      <td>{cert.certificateNo}</td>
                      <td>{cert.competitionName}</td>
                      <td>
                        {cert.position === 1 ? "🥇 1st" : cert.position === 2 ? "🥈 2nd" : "🥉 3rd"}
                      </td>
                      <td>
                        {new Date(cert.issueDate).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          className="btn btn-main-md"
                          style={{ padding: "6px 16px", fontSize: "13px" }}
                          onClick={() => handleDownload(cert)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Certificates Found
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

export default MyCertificates;
