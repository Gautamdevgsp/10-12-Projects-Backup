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
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>Categories</h3>
          <p>Browse travel categories</p>
        </div>
      </div>

      <div className="popular_destination_area">
        <div className="container">
          <div className="row">
            {categories.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p>No categories available</p>
              </div>
            ) : (
              categories.map((cat) => (
                <div key={cat.id} className="col-lg-4 col-md-6">
                  <div className="single_destination">
                    <div className="thumb" style={{ height: "250px", overflow: "hidden" }}>
                      <img
                        src={cat.imageUrl || "img/place/1.png"}
                        alt={cat.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div className="content">
                      <p>{cat.name}</p>
                      <Link
                        to={`/packages?category=${cat.id}`}
                        className="boxed-btn3"
                      >
                        View Packages
                      </Link>
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
