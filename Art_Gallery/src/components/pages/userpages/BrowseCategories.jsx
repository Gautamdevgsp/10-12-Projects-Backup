import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import CategoryService from "../../../services/CategoryService";

function BrowseCategories() {
  const [load, setLoad] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoad(true);
    try {
      const data = await CategoryService.getActive();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

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
          <HashLoader size={100} color="#0F172B" />
        </div>
      )}
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.9"
            data-stellar-vertical-offset={0}
          />
          <div className="container">
            <div className="banner_content text-center">
              <h2>BROWSE CATEGORIES</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="furniture_area p_120">
        <div className="container">
          <div className="main_title">
            <h2>Art Categories</h2>
            <p>Browse through our curated art categories to find the perfect piece for your collection.</p>
          </div>
          <div className="furniture_inner row">
            {categories.map((cat) => (
              <div className="col-lg-4" key={cat.id}>
                <Link to={`/artworks?category=${cat.id}`}>
                  <div className="furniture_item">
                    <h4>{cat.name}</h4>
                    <p>{cat.description || "Explore artworks in this category."}</p>
                  </div>
                </Link>
              </div>
            ))}
            {categories.length === 0 && !load && (
              <div className="col-12 text-center">
                <p>No categories found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default BrowseCategories;
