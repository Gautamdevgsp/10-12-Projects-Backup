import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import OrderService from "../../../services/OrderService";

function VerifyToken() {
  const [token, setToken] = useState("");
  const [order, setOrder] = useState(null);
  const [load, setLoad] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (token.trim() === "") {
      toast.error("Please enter a token number!");
      return;
    }

    setLoad(true);
    try {
      const data = await OrderService.getByToken(token.trim());
      if (data.length > 0) {
        setOrder(data[0]);
      } else {
        toast.error("No order found with this token!");
        setOrder(null);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoad(false);
    }
  };

  const handleConfirmDelivery = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Delivery?",
      text: "Mark this order as delivered?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Deliver",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await OrderService.updateOrderStatus(id, "Delivered");
      toast.success("Order marked as delivered!");
      setOrder(null);
      setToken("");
    }
  };

  return (
    <>
      <div className="container" style={{ padding: "40px 0" }}>
        <div className="text-center mb-5">
          <h2>Verify Token</h2>
          <p>Verify customer token at the counter</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="fcard" style={{ padding: "30px" }}>
              <form onSubmit={handleVerify}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="flbl">Token Number *</label>
                    <input
                      type="text"
                      className="fctrl"
                      placeholder="Enter token (e.g. TKN123456)"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                  </div>
                  <div className="col-12 text-center">
                    <button
                      className="btn-red"
                      type="submit"
                      disabled={load}
                    >
                      <i className="fas fa-search" />
                      {load ? "Searching..." : "Verify Token"}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {order && (
              <div className="table-wrap" style={{ marginTop: "20px" }}>
                <h3>Order Details — {order.tokenNumber}</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Token</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, idx) => (
                        <tr key={idx}>
                          {idx === 0 && (
                            <>
                              <td rowSpan={order.items.length}>{idx + 1}</td>
                              <td rowSpan={order.items.length}><strong>{order.tokenNumber}</strong></td>
                              <td rowSpan={order.items.length}>{order.userName}</td>
                              <td rowSpan={order.items.length}>{order.email}</td>
                              <td rowSpan={order.items.length}>{order.contact}</td>
                            </>
                          )}
                          <td>{item.name}</td>
                          <td>₹{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>₹{(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                          {idx === 0 && (
                            <>
                              <td rowSpan={order.items.length}>₹{order.totalAmount}</td>
                              <td rowSpan={order.items.length}>
                                <span className={`badge-status ${order.orderStatus}`}>
                                  {order.orderStatus}
                                </span>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-center mt-3">
                  {order.orderStatus === "Ready" && (
                    <button
                      className="btn-red"
                      onClick={() => handleConfirmDelivery(order.id)}
                    >
                      <i className="fas fa-check" /> Confirm Delivery
                    </button>
                  )}
                  {order.orderStatus === "Delivered" && (
                    <p style={{ color: "#28a745", fontWeight: "bold" }}>
                      Already Delivered
                    </p>
                  )}
                  {order.orderStatus !== "Ready" && order.orderStatus !== "Delivered" && (
                    <p className="text-muted" style={{ fontSize: "14px" }}>
                      Order is not ready yet. Current status: {order.orderStatus}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyToken;
