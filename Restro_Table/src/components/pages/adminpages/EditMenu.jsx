import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TableService from "../../../services/MenuService";
import CategoryService from "../../../services/CategoryService";
import CloudinaryService from "../../../services/CloudinaryService";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

function EditMenu() {
  const { id } = useParams();
  const nav = useNavigate();
  const [categories, setCategories] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [load, setLoad] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function loadData() {
    setFetching(true);
    const cats = await CategoryService.getActive();
    setCategories(cats);

    const data = await TableService.getSingle(id);
    if (data) {
      setTableNumber(data.tableNumber);
      setCapacity(data.capacity);
      setRatePerHour(data.ratePerHour || "");
      setImageUrl(data.imageUrl || "");
      setCategoryId(data.categoryId || "");
      setCategoryName(data.categoryName || "");
    }
    setFetching(false);
  }

  useEffect(() => {
    loadData();
  }, [id]);

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategoryId(val);
    const cat = categories.find((c) => c.id === val);
    setCategoryName(cat ? cat.name : "");
  };

  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setUploading(true);
    const url = await CloudinaryService.upload(selectedFile);
    if (url) setImageUrl(url);
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tableNumber || !capacity || !ratePerHour) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoad(true);
    try {
      await TableService.update(id, { tableNumber, capacity, ratePerHour, imageUrl, categoryId, categoryName });
      toast.success("Table updated successfully");
      nav("/admin/tables");
    } catch {
      toast.error("Failed to update table");
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
              <h5 className="section-title ff-secondary text-start text-primary fw-normal mb-2">Edit Table</h5>
              <h1 className="mb-4">Update Table</h1>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="tableNumber" placeholder="Table Number"
                        value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} />
                      <label htmlFor="tableNumber">Table Number</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input type="number" className="form-control" id="capacity" placeholder="Capacity"
                        value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                      <label htmlFor="capacity">Capacity (guests)</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input type="number" className="form-control" id="ratePerHour" placeholder="Rate per Hour"
                        value={ratePerHour} onChange={(e) => setRatePerHour(e.target.value)} min="0" />
                      <label htmlFor="ratePerHour">Rate per Hour (INR)</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <select className="form-select" id="categoryId" value={categoryId} onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      <label htmlFor="categoryId">Category (Optional)</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Table Image</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} />
                    {uploading && <p className="text-primary mt-2">Uploading image...</p>}
                    {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 rounded" style={{ width: 150, height: 100, objectFit: "cover" }} />}
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit" disabled={uploading}>Update Table</button>
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
export default EditMenu;
