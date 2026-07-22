import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";
import { HashLoader } from "react-spinners";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [fetching, setFetching] = useState(true);

  async function loadCategories() {
    setFetching(true);
    const data = await CategoryService.getActive();
    setCategories(data);
    setFetching(false);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  if (fetching) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <HashLoader size={80} color="#0F172B" />
      </div>
    );
  }

  return (
    <>
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container my-5 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-12 text-center">
              <h1 className="display-3 text-white animated slideInLeft">Categories</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Categories</h5>
            <h1 className="mb-5">Browse Categories</h1>
          </div>
        <div className="row g-4 justify-content-center">
          {categories.map((cat, i) => (
            <div key={cat.id} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`${(i % 4) * 0.1}s`}>
              <Link to={`/tables?category=${cat.id}`} className="text-decoration-none">
                <div className="card text-center p-4 border-0 shadow-sm h-100" style={{ borderRadius: 12 }}>
                  <div className="d-flex justify-content-center mb-3">
                    <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden" }}>
                      <img className="img-fluid w-100 h-100" src={cat.imageUrl || "img/category-1.jpg"} alt={cat.name} style={{ objectFit: "cover" }} />
                    </div>
                  </div>
                  <h5 className="text-dark mb-1">{cat.name}</h5>
                  <small className="text-muted">{cat.description}</small>
                  <div className="mt-3">
                    <span className="btn btn-primary btn-sm">View Tables</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="col-12 text-center">
              <p>No categories available</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
export default Categories;
