import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import CategoryService from "../../../services/CategoryService";
import CloudinaryService from "../../../services/CloudinaryService";

function EditCategory() {
  const { id } = useParams();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [load, setLoad] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    loadCategory();
  }, [id]);

  const loadCategory = async () => {
    const data = await CategoryService.getSingle(id);
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setImageUrl(data.imageUrl || "");
    } else {
      toast.error("Category not found!");
      nav("/admin/categories");
    }
    setFetching(false);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || description.trim() === "") {
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
      await CategoryService.update(id, {
        name,
        description,
        imageUrl: finalImageUrl,
      });
      toast.success("Category updated successfully!");
      nav("/admin/categories");
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
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "9999",
            gap: "16px",
          }}
        >
          <HashLoader size={100} color="#FF4A52" />
          {uploading && <p style={{ color: "#fff", fontSize: "1rem" }}>Uploading image...</p>}
        </div>
      )}

      <div className="container" style={{ padding: "40px 0" }}>
        <div className="text-center mb-4">
          <h2>Edit Category</h2>
          <p className="text-muted">Update food category details</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-9">
            <div className="fcard" style={{ padding: "30px" }}>
              {/* <h3 className="text-center mb-4">Category Details</h3> */}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-lg-12">
                    <label className="flbl">Category Name *</label>
                    <input
                      type="text"
                      className="fctrl"
                      placeholder="Category Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-12">
                    <label className="flbl">Description *</label>
                    <textarea
                      className="fctrl"
                      rows={4}
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-12">
                    <label className="flbl">Category Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="fctrl"
                      style={{ padding: "9px 15px" }}
                    />
                    <div style={{ marginTop: "12px" }}>
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "9px" }}
                        />
                      ) : imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="Current"
                          style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "9px" }}
                        />
                      ) : null}
                    </div>
                  </div>

                  <div className="col-lg-12 text-center">
                    <button className="btn-red" type="submit">
                      Update Category
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCategory;
