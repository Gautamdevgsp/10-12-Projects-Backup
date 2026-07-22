import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import ArtworkService from "../../../services/ArtworkService";
import CategoryService from "../../../services/CategoryService";
import CloudinaryService from "../../../services/CloudinaryService";

function EditArtwork() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(true);
  const [load, setLoad] = useState(false);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const loadData = async () => {
    setFetching(true);
    try {
      const [artworkData, categoriesData] = await Promise.all([
        ArtworkService.getSingle(id),
        CategoryService.getActive(),
      ]);
      setCategories(categoriesData);
      if (artworkData) {
        setTitle(artworkData.title);
        setArtistName(artworkData.artistName);
        setDescription(artworkData.description);
        setPrice(artworkData.price);
        setCategoryId(artworkData.categoryId);
        setCategoryName(artworkData.categoryName);
        setImageUrl(artworkData.imageUrl);
      }
    } catch (error) {
      console.log(error);
    }
    setFetching(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    setCategoryId(selectedId);
    const selected = categories.find((c) => c.id === selectedId);
    setCategoryName(selected ? selected.name : "");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoad(true);
    const url = await CloudinaryService.upload(file);
    if (url) {
      setImageUrl(url);
    }
    setLoad(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }
    setLoad(true);
    try {
      await ArtworkService.update(id, {
        title,
        artistName,
        description,
        price,
        categoryId,
        categoryName,
        imageUrl,
      });
      toast.success("Artwork updated successfully");
      navigate("/admin/artworks");
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
              <h2>EDIT ARTWORK</h2>
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
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Artwork Title *"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Artist Name"
                          value={artistName}
                          onChange={(e) => setArtistName(e.target.value)}
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
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          value={categoryId}
                          onChange={handleCategoryChange}
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
                    <div className="col-12">
                      <div className="form-group">
                        <label className="form-label">Artwork Image</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt="Preview"
                            className="mt-2"
                            style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn submit_btn">
                        Update Artwork
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

export default EditArtwork;
