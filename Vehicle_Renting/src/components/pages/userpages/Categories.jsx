import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";

function Categories() {
  const [categories, setCategories] = useState([]);

  async function loadCategories() {
    try {
      const data = await CategoryService.getActive();
      setCategories(data);
    } catch (error) {
      console.error("loadCategories error:", error);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <div className="page_banner">
        <div className="container">
          <h1>Vehicle Categories</h1>
          <p>Browse vehicle categories</p>
        </div>
      </div>

      <div className="about_section layout_padding">
        <div className="container">
          <div className="row">
            {categories.length === 0 ? (
              <div className="col-12 text-center">
                <p style={{ fontSize: "16px", color: "#666" }}>No categories available</p>
              </div>
            ) : (
              categories.map((cat) => (
                <div key={cat.id} className="col-lg-4 col-md-6">
                  <div className="gallery_box" style={{ textAlign: "center", padding: "30px 20px" }}>
                    {cat.imageUrl && (
                      <div style={{ marginBottom: "15px" }}>
                        <img src={cat.imageUrl} alt={cat.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
                      </div>
                    )}
                    <h3 className="types_text" style={{ textTransform: "uppercase" }}>{cat.name}</h3>
                    <p className="looking_text" style={{ margin: "15px 0", color: "#666", fontSize: "14px" }}>{cat.description}</p>
                    <div className="read_bt" style={{ margin: "0 auto" }}>
                      <Link to={`/vehicles?category=${cat.id}`}>View Vehicles</Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
