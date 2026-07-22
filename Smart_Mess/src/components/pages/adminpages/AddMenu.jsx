import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import CategoryService from "../../../services/CategoryService";
import MenuService from "../../../services/MenuService";
import CloudinaryService from "../../../services/CloudinaryService";

function AddMenu() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await CategoryService.all();
    setCategories(data);
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

    if (
      categoryId === "" ||
      name.trim() === "" ||
      description.trim() === "" ||
      price.trim() === ""
    ) {
      toast.error("All fields are required!");
      return;
    }

    setLoad(true);

    let imageUrl = "";
    if (imageFile) {
      setUploading(true);
      imageUrl = await CloudinaryService.upload(imageFile);
      setUploading(false);
      if (!imageUrl) {
        setLoad(false);
        return;
      }
    }

    try {
      const selectedCategory = categories.find((c) => c.id === categoryId);

      await MenuService.add({
        categoryId,
        categoryName: selectedCategory ? selectedCategory.name : "",
        name,
        description,
        price,
        imageUrl,
        status: "active",
        createdAt: new Date().toISOString(),
      });

      toast.success("Menu item added successfully!");
      nav("/admin/menus");
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
          <h2>Add Menu Item</h2>
          <p className="text-muted">Create a new food menu item</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-9">
            <div className="fcard" style={{ padding: "30px" }}>
              {/* <h3 className="text-center mb-4">Menu Details</h3> */}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-lg-12">
                    <label className="flbl">Category *</label>
                    <select
                      className="fctrl"
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

                  <div className="col-lg-6">
                    <label className="flbl">Item Name *</label>
                    <input
                      type="text"
                      className="fctrl"
                      placeholder="Item Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-6">
                    <label className="flbl">Price (₹) *</label>
                    <input
                      type="text"
                      className="fctrl"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
                    <label className="flbl">Menu Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="fctrl"
                      style={{ padding: "9px 15px" }}
                    />
                    {imagePreview && (
                      <div style={{ marginTop: "12px" }}>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "9px" }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="col-lg-12 text-center">
                    <button className="btn-red" type="submit">
                      Add Menu Item
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

export default AddMenu;
