import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import CategoryService from "../../../services/CategoryService";

function PlaceOrder() {
  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    setLoad(true);
    CategoryService.all({ status: "active" })
      .then(setCategories)
      .finally(() => setLoad(false));
  }, []);

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

      <section id="menu">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="slbl">Place Order</span>
            <h2 className="stitle">
              Browse <span>Categories</span>
            </h2>
            <div className="sline" />
            <p className="mt-3" style={{ color: "#777" }}>
              Select a category to browse menu items
            </p>
          </div>

          <div className="d-flex justify-content-end mb-4">
            <button className="btn-red" onClick={() => nav("/cart")} style={{ fontSize: "14px" }}>
              <i className="fas fa-shopping-cart me-1" />
              View Cart
            </button>
          </div>

          <div className="row g-4">
            {categories.length === 0 ? (
              <div className="col-12 text-center">
                <p>No categories available</p>
              </div>
            ) : (
              categories.map((cat) => (
                <div key={cat.id} className="col-sm-6 col-lg-4 pb-5">
                  <div
                    className="mcard"
                    style={{ cursor: "pointer" }}
                    onClick={() => nav(`/place-order/${cat.id}`)}
                  >
                    <div className="mimg">
                      <img
                        src={cat.imageUrl || "img/menu/1.jpg"}
                        alt={cat.name}
                      />
                    </div>
                    <div className="mbody">
                      <div className="mtit" style={{ textAlign: "center" }}>{cat.name}</div>
                      {cat.description && (
                        <div className="mdesc" style={{ textAlign: "center" }}>
                          {cat.description}
                        </div>
                      )}
                      <div style={{ textAlign: "center", marginTop: "10px" }}>
                        <span className="btn-red" style={{ padding: "6px 20px", fontSize: "13px" }}>
                          View Items
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default PlaceOrder;
