import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { createEvent } from "../../../services/firebaseUtils";
import uploadImage from "../../../services/cloudinary";

function Createevent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [load, setLoad] = useState(false);

  const nav = useNavigate();

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !eventDate ||
      !eventTime ||
      !venue ||
      !capacity ||
      !registrationDeadline
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

      const eventData = {
        title,
        description,
        eventDate,
        eventTime,
        venue,
        capacity: Number(capacity),
        registrationDeadline,
        image: imageUrl,
        status: "active",
      };

      await createEvent(eventData);

      toast.success("Event Created Successfully");

      setTimeout(() => {
        nav("/admin/allevents");
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
          <RingLoader size={100} color="#FF6B35" />
        </div>
      )}

      <section className="page-title bg-title overlay-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="title">
                <h3>Create Event</h3>
              </div>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  Home
                </li>

                <li className="breadcrumb-item active">
                  Create Event
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
                  Create <span className="alternate">New Event</span>
                </h3>

                <p>
                  Fill in the details below to create a new event.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleCreateEvent}
            className="row"
          >
            <div className="col-md-12">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Event Title</label>
              <input
                type="text"
                className="form-control main"
                placeholder="Enter event title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />
            </div>

            <div className="col-md-12">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Event Description</label>
              <textarea
                rows="5"
                className="form-control main"
                placeholder="Enter event description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />
            </div>

            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Event Date</label>
              <input
                type="date"
                className="form-control main"
                value={eventDate}
                onChange={(e) =>
                  setEventDate(e.target.value)
                }
              />
            </div>

            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Event Time</label>
              <input
                type="time"
                className="form-control main"
                value={eventTime}
                onChange={(e) =>
                  setEventTime(e.target.value)
                }
              />
            </div>

            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Venue</label>
              <input
                type="text"
                className="form-control main"
                placeholder="Enter venue"
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
                placeholder="Enter capacity"
                value={capacity}
                onChange={(e) =>
                  setCapacity(e.target.value)
                }
              />
            </div>

            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Last Date for Registration</label>
              <input
                type="date"
                className="form-control main"
                value={registrationDeadline}
                onChange={(e) =>
                  setRegistrationDeadline(e.target.value)
                }
              />
            </div>

            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Event Image</label>
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
                Create Event
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Createevent;