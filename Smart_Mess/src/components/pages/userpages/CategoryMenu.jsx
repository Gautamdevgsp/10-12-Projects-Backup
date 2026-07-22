import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import MenuService from "../../../services/MenuService";
import CategoryService from "../../../services/CategoryService";

function CategoryMenu() {
  const { categoryId } = useParams();
  const [menus, setMenus] = useState([]);
  const [category, setCategory] = useState(null);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    setLoad(true);
    Promise.all([
      MenuService.all({ status: "active", categoryId }),
      CategoryService.getSingle(categoryId),
    ])
      .then(([menuData, catData]) => {
        setMenus(menuData);
        setCategory(catData);
      })
      .finally(() => setLoad(false));
  }, [categoryId]);

  const getCart = () => JSON.parse(sessionStorage.getItem("cart") || "[]");
  const saveCart = (c) => sessionStorage.setItem("cart", JSON.stringify(c));

  const addToCart = (menu) => {
    const cart = getCart();
    const existing = cart.find((item) => item.id === menu.id);
    if (existing) {
      saveCart(
        cart.map((item) =>
          item.id === menu.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      saveCart([...cart, { ...menu, quantity: 1 }]);
    }
    toast.success(`${menu.name} added to cart!`);
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
          <HashLoader size={100} color="#FF4A52" />
        </div>
      )}

      <section id="menu">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="slbl">{category?.name || "Category"}</span>
            <h2 className="stitle">
              Browse <span>Menu</span> Items
            </h2>
            <div className="sline" />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => nav("/place-order")}
            >
              <i className="fas fa-arrow-left me-1" />
              Back to Categories
            </button>
            <button className="btn-red" onClick={() => nav("/cart")} style={{ fontSize: "14px" }}>
              <i className="fas fa-shopping-cart me-1" />
              View Cart
            </button>
          </div>

          <div className="row g-4">
            {menus.length === 0 ? (
              <div className="col-12 text-center">
                <p>No menu items in this category</p>
              </div>
            ) : (
              menus.map((menu) => (
                <div key={menu.id} className="col-sm-6 col-lg-4 pb-5">
                  <div className="mcard">
                    <div className="mimg">
                      <img
                        src={menu.imageUrl || "img/menu/1.jpg"}
                        alt={menu.name}
                      />
                    </div>
                    <div className="mbody">
                      <div className="mcat">{menu.categoryName}</div>
                      <div className="mtit">{menu.name}</div>
                      <div className="mdesc">{menu.description}</div>
                      <div className="mfoot">
                        <div>
                          <div className="mprice">₹{menu.price}</div>
                        </div>
                        <button
                          className="madd"
                          title="Add to Cart"
                          onClick={() => addToCart(menu)}
                        >
                          <i className="fas fa-plus" />
                        </button>
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

export default CategoryMenu;
