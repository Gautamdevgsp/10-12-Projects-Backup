import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderService from "../../../services/OrderService";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const nav = useNavigate();

  const loadOrders = async (userId) => {
    const data = await OrderService.getByUser(userId);
    setOrders(data);
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      nav("/login");
      return;
    }
    loadOrders(user.id);
  }, []);

  const filtered = search.trim()
    ? orders.filter((o) => o.tokenNumber.toLowerCase().includes(search.toLowerCase()))
    : orders;

  return (
    <>
      <section id="menu" style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="text-center mb-4" data-aos="fade-up">
            <span className="slbl">My Orders</span>
            <h2 className="stitle">
              Order <span>History</span>
            </h2>
            <div className="sline" />
          </div>

          <div className="row">
            <div className="col-12">
              <div className="table-wrap">
                <h3>Your Orders</h3>
                <div className="mb-3">
                  <input
                    type="text"
                    className="fctrl"
                    placeholder="Search by token number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ maxWidth: "300px" }}
                  />
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Token</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Order Status</th>
                        <th>Payment</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center py-4 text-muted">
                            No orders yet
                          </td>
                        </tr>
                      ) : (
                        filtered.map((order, index) => (
                          <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{order.tokenNumber}</strong>
                            </td>
                            <td>
                              {order.items.map((item, idx) => (
                                <div key={idx}>
                                  {item.name} x {item.quantity}
                                </div>
                              ))}
                            </td>
                            <td>₹{order.totalAmount}</td>
                            <td>
                              <span className={`badge-status ${order.orderStatus}`}>
                                {order.orderStatus}
                              </span>
                            </td>
                            <td>
                              <span className={`badge-status ${order.paymentStatus}`}>
                                {order.paymentStatus}
                              </span>
                            </td>
                            <td>
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString()
                                : "-"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OrderHistory;
