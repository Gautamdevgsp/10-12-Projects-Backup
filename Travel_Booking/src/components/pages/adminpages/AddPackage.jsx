import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import CategoryService from "../../../services/CategoryService";
import PackageService from "../../../services/PackageService";
import CloudinaryService from "../../../services/CloudinaryService";

function AddPackage() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const data = await CategoryService.all();
    setCategories(data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      categoryId === "" ||
      title.trim() === "" ||
      description.trim() === "" ||
      destination.trim() === "" ||
      duration.trim() === "" ||
      price.trim() === ""
    ) {
      toast.error("All fields are required!");
      return;
    }

    setLoad(true);

    let finalImageUrl = imageUrl;
    if (imageFile) {
      setUploading(true);
      finalImageUrl = await CloudinaryService.upload(imageFile);
      setUploading(false);
      if (!finalImageUrl) {
        setLoad(false);
        return;
      }
    }

    try {
      const selectedCategory = categories.find((c) => c.id === categoryId);

      await PackageService.add({
        categoryId,
        categoryName: selectedCategory ? selectedCategory.name : "",
        title,
        description,
        destination,
        duration,
        price,
        imageUrl: finalImageUrl || "",
        status: "active",
        createdAt: new Date().toISOString(),
      });

      toast.success("Package added successfully!");
      nav("/admin/packages");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoad(false);
    }
  };

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

      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>Add Package</h3>
          <p>Create a new travel package</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-9">
              <div className="contact_join">
                <h3 className="text-center">Package Details</h3>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="single_input">
                        <select
                          className="p-3"
                          value={categoryId}
                          onChange={(e) => setCategoryId(e.target.value)}
                          style={{ width: "100%", height:"60%"}}
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="single_input">
                        <textarea
                          cols={30}
                          rows={4}
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Destination"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Duration (e.g. 5 Days)"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Price ($)"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="single_input">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files[0])}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="submit_btn">
                        <button className="boxed-btn4" type="submit">
                          Add Package
                        </button>
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

export default AddPackage;
