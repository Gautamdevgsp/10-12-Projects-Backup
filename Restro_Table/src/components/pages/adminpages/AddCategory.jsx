import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";
import CloudinaryService from "../../../services/CloudinaryService";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

function AddCategory() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [load, setLoad] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setUploading(true);
    const url = await CloudinaryService.upload(selectedFile);
    if (url) {
      setImageUrl(url);
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      toast.error("Please fill all fields");
      return;
    }
    setLoad(true);
    try {
      await CategoryService.add({ name, description, imageUrl });
      toast.success("Category added successfully");
      nav("/admin/categories");
    } catch {
      toast.error("Failed to add category");
    }
    setLoad(false);
  };

  return (
    <>
      {load && (
        <div style={{
          position: "fixed", width: "100%", height: "100%", top: 0, left: 0,
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: "9999",
        }}>
          <HashLoader size={100} color="#0F172B" />
        </div>
      )}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h5 className="section-title ff-secondary text-start text-primary fw-normal mb-2">Add Category</h5>
              <h1 className="mb-4">New Category</h1>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="name" placeholder="Category Name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                      <label htmlFor="name">Category Name</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea className="form-control" id="description" placeholder="Description"
                        style={{ height: 100 }} value={description} onChange={(e) => setDescription(e.target.value)} />
                      <label htmlFor="description">Description</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} />
                    {uploading && <p className="text-primary mt-2">Uploading image...</p>}
                    {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 rounded" style={{ width: 150, height: 100, objectFit: "cover" }} />}
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit" disabled={uploading}>
                      Add Category
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
export default AddCategory;
