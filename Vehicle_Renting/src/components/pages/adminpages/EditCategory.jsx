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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [load, setLoad] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    loadCategory();
  }, [id]);

  async function loadCategory() {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
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

    try {
      let finalImageUrl = imageUrl;
      if (image) {
        finalImageUrl = await CloudinaryService.upload(image, "vehicle-renting/categories");
      }

      await CategoryService.update(id, { name, description, imageUrl: finalImageUrl });
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
          <HashLoader size={100} color="#FF4A52" />
        </div>
      )}

      <div className="page_banner">
        <div className="container">
          <h1>Edit Category</h1>
          <p>Update vehicle category details</p>
        </div>
      </div>

      <div className="about_section layout_padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-9">
              <div className="form_wrap">
                <h3>Category Details</h3>

                <form onSubmit={handleSubmit}>
                  <div className="mail_section_1">
                    <input
                      type="text"
                      className="mail_text"
                      placeholder="Category Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <textarea
                      className="mail_text"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

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

                    <div className="send_bt">
                      <button type="submit">Update Category</button>
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

export default EditCategory;
