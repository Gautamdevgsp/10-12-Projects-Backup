import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import CategoryService from "../../../services/CategoryService";
import CloudinaryService from "../../../services/CloudinaryService";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const loadData = async () => {
    setFetching(true);
    try {
      const data = await CategoryService.getSingle(id);
      if (data) {
        setName(data.name);
        setDescription(data.description);
        setImage(data.image || "");
      }
    } catch (error) {
      console.log(error);
    }
    setFetching(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoad(true);
    const url = await CloudinaryService.upload(file);
    if (url) {
      setImage(url);
    }
    setLoad(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }
    setLoad(true);
    try {
      await CategoryService.update(id, { name, description, image });
      toast.success("Category updated successfully");
      navigate("/admin/categories");
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoad(false);
  };

  if (fetching) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <HashLoader size={80} color="#0F172B" />
      </div>
    );
  }

  return (
    <>
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.9"
            data-stellar-vertical-offset={0}
          />
          <div className="container">
            <div className="banner_content text-center">
              <h2>EDIT CATEGORY</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact_form">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Category Name *"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          placeholder="Description"
                          rows="4"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label">Category Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        {image && (
                          <img
                            src={image}
                            alt="Preview"
                            className="mt-2"
                            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn submit_btn">
                        Update Category
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
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
          <HashLoader size={100} color="#0F172B" />
        </div>
      )}
    </>
  );
}

export default EditCategory;
