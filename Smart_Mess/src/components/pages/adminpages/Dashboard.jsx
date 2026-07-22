import { useState, useEffect } from "react";
import CategoryService from "../../../services/CategoryService";
import MenuService from "../../../services/MenuService";
import OrderService from "../../../services/OrderService";

function Dashboard() {
  const [categories, setCategories] = useState(0);
  const [menus, setMenus] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [readyOrders, setReadyOrders] = useState(0);

  const loadData = async () => {
    const catData = await CategoryService.all();
    setCategories(catData.length);

    const menuData = await MenuService.all();
    setMenus(menuData.length);

    const orderData = await OrderService.all();
    setTotalOrders(orderData.length);
    setPendingOrders(orderData.filter((o) => o.orderStatus === "Pending").length);
    setReadyOrders(orderData.filter((o) => o.orderStatus === "Ready").length);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="container" style={{ padding: "40px 0" }}>
        <div className="text-center mb-5">
          <h2>Admin Dashboard</h2>
          <p>Overview of your food management system</p>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="fcard text-center" style={{ padding: "30px 20px" }}>
              <h3 style={{ fontSize: "36px", color: "#007bff" }}>
                {categories}
              </h3>
              <p>Total Categories</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="fcard text-center" style={{ padding: "30px 20px" }}>
              <h3 style={{ fontSize: "36px", color: "#28a745" }}>
                {menus}
              </h3>
              <p>Total Menu Items</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="fcard text-center" style={{ padding: "30px 20px" }}>
              <h3 style={{ fontSize: "36px", color: "#ffc107" }}>
                {totalOrders}
              </h3>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="fcard text-center" style={{ padding: "30px 20px" }}>
              <h3 style={{ fontSize: "36px", color: "#dc3545" }}>
                {pendingOrders}
              </h3>
              <p>Pending Orders</p>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="fcard text-center" style={{ padding: "30px 20px" }}>
              <h3 style={{ fontSize: "36px", color: "#17a2b8" }}>
                {readyOrders}
              </h3>
              <p>Ready Orders</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
