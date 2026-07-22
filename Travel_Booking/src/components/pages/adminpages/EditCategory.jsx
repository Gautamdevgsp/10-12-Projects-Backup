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
  const [uploading, setUploading] = useState(false);
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
          <h3>Edit Category</h3>
          <p>Update travel category details</p>
        </div>
      </div>

      <div className="destination_details_info">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-9">
              <div className="contact_join">
                <h3 className="text-center">Category Details</h3>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="single_input">
                        <input
                          type="text"
                          placeholder="Category Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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

                    <div className="col-lg-12">
                      <div className="single_input">
                        {imageUrl && (
                          <p style={{ marginBottom: "10px", fontSize: "13px", color: "#666" }}>
                            Current: {imageUrl.split("/").pop()}
                          </p>
                        )}
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
                          Update Category
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

export default EditCategory;
