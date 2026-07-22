import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import OrderService from "../../../services/OrderService";
import AuthServices from "../../../helpers/AuthServices";

function MyOrders() {
  const nav = useNavigate();
  const [load, setLoad] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = AuthServices.getUser();
    if (!user) {
      nav("/login");
      return;
    }
    loadOrders(user.uid);
  }, []);

  const loadOrders = async (userId) => {
    setLoad(true);
    try {
      const data = await OrderService.getByUser(userId);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "badge bg-success";
      case "Shipped":
        return "badge bg-info";
      case "Cancelled":
        return "badge bg-danger";
      default:
        return "badge bg-warning";
    }
  };

  const getPaymentBadge = (status) => {
    if (status === "Paid") return "badge bg-success";
    return "badge bg-danger";
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
              <h2>MY ORDERS</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Artwork</th>
                    <th>Amount</th>
                    <th>Payment Status</th>
                    <th>Order Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {order.artworkImage && (
                            <img
                              src={order.artworkImage}
                              alt={order.artworkTitle}
                              style={{
                                width: 50,
                                height: 50,
                                objectFit: "cover",
                                marginRight: 10,
                              }}
                            />
                          )}
                          {order.artworkTitle}
                        </div>
                      </td>
                      <td>₹{order.price}</td>
                      <td>
                        <span className={getPaymentBadge(order.paymentStatus)}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span className={getStatusBadge(order.orderStatus)}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && !load && (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyOrders;
