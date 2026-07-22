import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { getEventById, updateEvent } from "../../../services/firebaseUtils";
import uploadImage from "../../../services/cloudinary";

function EditEvent() {
  const { id } = useParams();
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    getEventData();
  }, []);

  const getEventData = async () => {
    try {
      setLoad(true);

      const event = await getEventById(id);

      if (event) {
        setTitle(event.title || "");
        setDescription(event.description || "");
        setEventDate(event.eventDate || "");
        setEventTime(event.eventTime || "");
        setVenue(event.venue || "");
        setCapacity(event.capacity || "");
        setRegistrationDeadline(event.registrationDeadline || "");
        setStatus(event.status || "active");
        setImage(event.image || "");
      } else {
        toast.error("Event not found");
        nav("/admin/allevents");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setLoad(false);
  };

  const handleUpdate = async (e) => {
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

      await updateEvent(id, {
        title,
        description,
        eventDate,
        eventTime,
        venue,
        capacity: Number(capacity),
        registrationDeadline,
        image: imageUrl,
        status,
      });

      toast.success("Event Updated Successfully");

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
                <h3>Edit Event</h3>
              </div>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  Home
                </li>

                <li className="breadcrumb-item active">
                  Edit Event
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
                  Update <span className="alternate">Event</span>
                </h3>

                <p>
                  Modify the event details below.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleUpdate}
            className="row"
          >
            <div className="col-md-12">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Event Title</label>
              <input
                type="text"
                className="form-control main"
                placeholder="Event Title"
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
                placeholder="Event Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
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
                  setEventDate(
                    e.target.value
                  )
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
                  setEventTime(
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
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Last Date for Registration</label>
              <input
                type="date"
                className="form-control main"
                value={registrationDeadline}
                onChange={(e) =>
                  setRegistrationDeadline(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="col-md-6">
              <label style={{ color: "#FF6B35", fontWeight: "bold", marginBottom: "5px", display: "block" }}>Status</label>
              <select
                className="form-control main"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

            <div className="col-md-12">
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
                Update Event
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default EditEvent;