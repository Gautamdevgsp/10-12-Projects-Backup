import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import CategoryService from "../../../services/CategoryService";
import VehicleService from "../../../services/VehicleService";
import CloudinaryService from "../../../services/CloudinaryService";

function EditVehicle() {
  const { id } = useParams();
  const nav = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [load, setLoad] = useState(false);
  const [fetching, setFetching] = useState(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    const catData = await CategoryService.all();
    setCategories(catData);

    const vehData = await VehicleService.getSingle(id);
    if (vehData) {
      setCategoryId(vehData.categoryId);
      setVehicleName(vehData.vehicleName);
      setVehicleNumber(vehData.vehicleNumber);
      setBrand(vehData.brand);
      setModel(vehData.model);
      setRentPerDay(vehData.rentPerDay);
      setDescription(vehData.description);
      setImageUrl(vehData.imageUrl || "");
    } else {
      toast.error("Vehicle not found!");
      nav("/admin/vehicles");
    }
    setFetching(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      categoryId === "" ||
      vehicleName.trim() === "" ||
      vehicleNumber.trim() === "" ||
      brand.trim() === "" ||
      model.trim() === "" ||
      rentPerDay.trim() === "" ||
      description.trim() === ""
    ) {
      toast.error("All fields are required!");
      return;
    }

    setLoad(true);

    let finalImageUrl = imageUrl;
    if (image) {
      setUploading(true);
      finalImageUrl = await CloudinaryService.upload(image);
      setUploading(false);
      if (!finalImageUrl) {
        setLoad(false);
        return;
      }
    }

    try {
      const selectedCategory = categories.find((c) => c.id === categoryId);

      await VehicleService.update(id, {
        categoryId,
        categoryName: selectedCategory ? selectedCategory.name : "",
        vehicleName,
        vehicleNumber,
        brand,
        model,
        rentPerDay,
        description,
        imageUrl: finalImageUrl || "",
      });

      toast.success("Vehicle updated successfully!");
      nav("/admin/vehicles");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoad(false);
    }
  };

  if (fetching) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
        }}
      >
        <HashLoader size={80} color="#FF4A52" />
      </div>
    );
  }

  return (
    <>
      {(load || uploading) && (
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
          <div style={{ textAlign: "center" }}>
            <HashLoader size={100} color="#FF4A52" />
            {uploading && (
              <p style={{ color: "#fff", marginTop: "15px" }}>
                Uploading image...
              </p>
            )}
          </div>
        </div>
      )}

      <div className="page_banner">
        <div className="container">
          <h1>Edit Vehicle</h1>
          <p>Update vehicle details</p>
        </div>
      </div>

      <div className="about_section layout_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-9">
              <div className="form_wrap">
                <h3>Vehicle Details</h3>

                <form onSubmit={handleSubmit}>
                  <div className="mail_section_1">
                    <div className="row">
                      <div className="col-md-6">
                        <select
                          className="mail_text"
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <input
                          type="text"
                          className="mail_text"
                          placeholder="Vehicle Name"
                          value={vehicleName}
                          onChange={(e) => setVehicleName(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="text"
                          className="mail_text"
                          placeholder="Vehicle Number"
                          value={vehicleNumber}
                          onChange={(e) => setVehicleNumber(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="text"
                          className="mail_text"
                          placeholder="Brand"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="text"
                          className="mail_text"
                          placeholder="Model"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="number"
                          className="mail_text"
                          placeholder="Rent Per Day (₹)"
                          value={rentPerDay}
                          onChange={(e) => setRentPerDay(e.target.value)}
                        />
                      </div>

                      <div className="col-md-12">
                        <textarea
                          className="mail_text"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="col-md-12">
                        <input
                          type="file"
                          className="mail_text"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ padding: "9px 20px" }}
                        />
                        {imagePreview ? (
                          <div style={{ marginTop: "15px", textAlign: "center" }}>
                            <img src={imagePreview} alt="Preview" style={{ maxWidth: "200px", maxHeight: "150px", borderRadius: "5px" }} />
                          </div>
                        ) : imageUrl ? (
                          <div style={{ marginTop: "15px", textAlign: "center" }}>
                            <img src={imageUrl} alt="Current" style={{ maxWidth: "200px", maxHeight: "150px", borderRadius: "5px" }} />
                          </div>
                        ) : null}
                      </div>

                      <div className="col-md-12">
                        <div className="send_bt">
                          <button type="submit">Update Vehicle</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditVehicle;
