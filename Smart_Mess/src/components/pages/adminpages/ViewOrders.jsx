import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import OrderService from "../../../services/OrderService";

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [load, setLoad] = useState(false);

  const loadOrders = async () => {
    const data = await OrderService.all();
    setOrders(data);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (id, currentStatus) => {
    const statuses = {
      Pending: "InProgress",
      InProgress: "Ready",
      Ready: "Ready",
      Delivered: "Delivered",
    };

    const nextStatus = statuses[currentStatus] || currentStatus;

    if (currentStatus === "Delivered") {
      toast.info("Order is already delivered");
      return;
    }

    if (currentStatus === "Ready") {
      toast.info("Order is ready — verify token to mark delivered");
      return;
    }

    const result = await Swal.fire({
      title: "Update Order Status?",
      text: `Change status from "${currentStatus}" to "${nextStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setLoad(true);
      await OrderService.updateOrderStatus(id, nextStatus);
      toast.success(`Order status updated to ${nextStatus}!`);
      loadOrders();
      setLoad(false);
    }
  };

  return (
    <>
      {load && <p className="text-center text-muted">Processing...</p>}

      <div className="container" style={{ padding: "40px 0" }}>
        <div className="text-center mb-4">
          <h2>View Orders</h2>
          <p className="text-muted">Manage all incoming orders and update their status</p>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="table-wrap">
              <h3>All Orders</h3>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Token</th>
                      <th>User</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Order Status</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-muted">
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      orders.map((order, index) => (
                        <tr key={order.id}>
                          <td>{index + 1}</td>
                          <td>
                            <strong>{order.tokenNumber}</strong>
                          </td>
                          <td>{order.userName}</td>
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
                            <button
                              className="btn-sm"
                              onClick={() =>
                                handleUpdateStatus(
                                  order.id,
                                  order.orderStatus
                                )
                              }
                              style={{
                                background: "var(--primary)",
                                color: "#fff",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              Update
                            </button>
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
    </>
  );
}

export default ViewOrders;
