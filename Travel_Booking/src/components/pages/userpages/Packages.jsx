import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PackageService from "../../../services/PackageService";
import CategoryService from "../../../services/CategoryService";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const destinationParam = searchParams.get("destination");

  async function loadCategories() {
    const data = await CategoryService.getActive();
    setCategories(data);
  };

  async function loadPackages() {
    let data;
    if (categoryId) {
      data = await PackageService.getByCategory(categoryId);
    } else {
      data = await PackageService.getActive();
    }
    if (destinationParam) {
      const term = destinationParam.toLowerCase();
      data = data.filter((pkg) =>
        pkg.destination?.toLowerCase().includes(term)
      );
    }
    setPackages(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadPackages();
  }, [categoryId, destinationParam]);

  return (
    <>
      <div className="destination_banner_wrap overlay">
        <div className="destination_text text-center">
          <h3>Travel Packages</h3>
          <p>Choose your dream destination</p>
        </div>
      </div>

      <div className="popular_places_area">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex flex-wrap gap-2">
                <Link
                  to="/packages"
                  className={`boxed-btn3 mr-2 ${!categoryId && !destinationParam ? "active" : ""}`}
                >
                  All
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/packages?category=${cat.id}`}
                    className={`boxed-btn3 mr-2 ${
                      categoryId === cat.id ? "active" : ""
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {destinationParam && (
            <div className="row mb-3">
              <div className="col-12">
                <h5 style={{ color: "#FF4A52" }}>
                  Packages matching "{destinationParam}"
                </h5>
              </div>
            </div>
          )}

          <div className="row">
            {packages.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p>
                  {destinationParam
                    ? "No package currently available for this destination."
                    : "No packages available"}
                </p>
              </div>
            ) : (
              packages.map((pkg) => (
                <div key={pkg.id} className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="single_place"
                    style={
                      destinationParam
                        ? { border: "2px solid #FF4A52", borderRadius: "8px" }
                        : {}
                    }
                  >
                    <div className="thumb">
                      <img
                        src={pkg.imageUrl || "img/place/1.png"}
                        alt={pkg.title}
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      />
                      <a href="#" className="prise">
                        ${pkg.price}
                      </a>
                    </div>
                    <div className="place_info">
                      <Link to={`/package-detail/${pkg.id}`}>
                        <h3>{pkg.title}</h3>
                      </Link>
                      <p>{pkg.destination}</p>
                      <div className="rating_days d-flex justify-content-between">
                        <span>{pkg.categoryName}</span>
                        <div className="days">
                          <i className="fa fa-clock-o" />
                          <a href="#">{pkg.duration}</a>
                        </div>
                      </div>
                      <Link
                        to={`/package-detail/${pkg.id}`}
                        className="boxed-btn4 mt-3 d-block text-center"
                      >
                        View Details
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

export default Packages;
