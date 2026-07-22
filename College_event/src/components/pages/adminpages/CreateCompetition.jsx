import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { getAllEvents, createCompetition } from "../../../services/firebaseUtils";
import uploadImage from "../../../services/cloudinary";

function CreateCompetition() {
  const [events, setEvents] = useState([]);

  const [eventId, setEventId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState("");
  const [prize, setPrize] = useState("");
  const [competitionDate, setCompetitionDate] = useState("");
  const [competitionTime, setCompetitionTime] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [load, setLoad] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const eventList = await getAllEvents();
      setEvents(eventList);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch events");
    }
  };

  const handleCreateCompetition = async (e) => {
    e.preventDefault();

    if (
      !eventId ||
      !title ||
      !description ||
      !venue ||
      !capacity ||
      !competitionDate ||
      !competitionTime
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoad(true);

      let imageUrl = image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const selectedEvent = events.find(
        (event) => event.id === eventId
      );

      const competitionData = {
        eventId,
        eventName: selectedEvent?.title || "",
        title,
        description,
        venue,
        capacity: Number(capacity),
        prize: prize || "",
        competitionDate,
        competitionTime,
        image: imageUrl,
        status,
      };

      await createCompetition(competitionData);

      toast.success(
        "Competition Created Successfully"
      );

      setTimeout(() => {
        nav("/admin/competitions");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
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
          <RingLoader
            size={100}
            color="#FF6B35"
          />
        </div>
      )}

      <section className="page-title bg-title overlay-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="title">
                <h3>Create Competition</h3>
              </div>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  Home
                </li>

                <li className="breadcrumb-item active">
                  Create Competition
                </li>
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
                  Create{" "}
                  <span className="alternate">
                    Competition
                  </span>
                </h3>

                  <p>
                    Create a new competition and
                    associate it with an event.
                  </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleCreateCompetition}
            className="row"
          >
            <div className="col-md-12">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Event</label>
              <select
                className="form-control main"
                style={{height:"60%"}}
                value={eventId}
                onChange={(e) =>
                  setEventId(e.target.value)
                }
              >
                <option value="">
                  Select Event
                </option>

                {events.map((event) => (
                  <option
                    key={event.id}
                    value={event.id}
                  >
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
           

            <div className="col-md-12">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block", paddingTop:"10px" }}>Competition Title</label>
              <input
                type="text"
                className="form-control main"
                placeholder="Competition Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />
            </div>

            <div className="col-md-12">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Competition Description</label>
              <textarea
                rows="5"
                className="form-control main"
                placeholder="Competition Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Venue</label>
              <input
                type="text"
                className="form-control main"
                placeholder="Venue"
                value={venue}
                onChange={(e) =>
                  setVenue(e.target.value)
                }
              />
            </div>

            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Capacity</label>
              <input
                type="number"
                className="form-control main"
                placeholder="Capacity"
                value={capacity}
                onChange={(e) =>
                  setCapacity(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Prize</label>
              <input
                type="text"
                className="form-control main"
                placeholder="Prize (Optional)"
                value={prize}
                onChange={(e) =>
                  setPrize(e.target.value)
                }
              />
            </div>

            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Competition Date</label>
              <input
                type="date"
                className="form-control main"
                value={competitionDate}
                onChange={(e) =>
                  setCompetitionDate(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Competition Time</label>
              <input
                type="time"
                className="form-control main"
                value={competitionTime}
                onChange={(e) =>
                  setCompetitionTime(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="col-md-12">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Competition Image</label>
              <input
                type="file"
                className="form-control main"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImageFile(file);
                    setImage(URL.createObjectURL(file));
                  }
                }}
              />
              {image && (
                <div style={{ marginTop: "10px" }}>
                  <img
                    src={image}
                    alt="Preview"
                    style={{ width: "200px", borderRadius: "8px" }}
                  />
                </div>
              )}
            </div>

            <div className="col-12 text-center">
              <button
                type="submit"
                className="btn btn-main-md"
              >
                Create Competition
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default CreateCompetition;