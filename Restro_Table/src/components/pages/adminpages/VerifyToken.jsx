import { useState } from "react";
import OrderService from "../../../services/OrderService";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

function VerifyToken() {
  const [token, setToken] = useState("");
  const [order, setOrder] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [load, setLoad] = useState(false);

  const handleVerify = async () => {
    if (!token) {
      toast.error("Please enter a token number");
      return;
    }
    setFetching(true);
    const orders = await OrderService.all({ tokenNumber: token });
    if (orders.length === 0) {
      toast.error("No order found with this token");
      setOrder(null);
    } else {
      setOrder(orders[0]);
    }
    setFetching(false);
  };

  const handleUpdateStatus = async (newStatus) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Update order status to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      setLoad(true);
      await OrderService.updateOrderStatus(order.id, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      const updated = { ...order, orderStatus: newStatus };
      setOrder(updated);
      setLoad(false);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      Pending: "bg-warning",
      Preparing: "bg-info",
      Ready: "bg-success",
      Delivered: "bg-secondary",
    };
    return map[status] || "bg-warning";
  };

  return (
    <>
      {load && (
        <div style={{
          position: "fixed", width: "100%", height: "100%", top: 0, left: 0,
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: "9999",
        }}>
          <HashLoader size={100} color="#0F172B" />
        </div>
      )}

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="text-center mb-4">
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">Verify Token</h5>
                <h1 className="mb-4">Check Order Status</h1>
              </div>

              <div className="input-group mb-4">
                <input type="text" className="form-control" placeholder="Enter Token Number"
                  value={token} onChange={(e) => setToken(e.target.value)} />
                <button className="btn btn-primary" onClick={handleVerify} disabled={fetching}>
                  {fetching ? "Searching..." : "Verify"}
                </button>
              </div>

              {order && (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Order Details</h5>
                    <p><strong>Token:</strong> {order.tokenNumber}</p>
                    <p><strong>Customer:</strong> {order.userName}</p>
                    <p><strong>Items:</strong></p>
                    <ul>
                      {order.items?.map((it, i) => (
                        <li key={i}>{it.menuName} x {it.quantity} - ₹{parseFloat(it.price) * it.quantity}</li>
                      ))}
                    </ul>
                    <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                    <p><strong>Status:</strong> <span className={`badge ${getStatusBadge(order.orderStatus)}`}>{order.orderStatus}</span></p>
                    <p><strong>Payment:</strong> <span className={`badge ${order.paymentStatus === "Paid" ? "bg-success" : "bg-danger"}`}>{order.paymentStatus}</span></p>

                    {order.orderStatus !== "Delivered" && (
                      <div className="mt-3">
                        <h6>Update Status:</h6>
                        <div className="d-flex gap-2 flex-wrap">
                          {order.orderStatus === "Pending" && (
                            <button className="btn btn-info" onClick={() => handleUpdateStatus("Preparing")}>Mark Preparing</button>
                          )}
                          {order.orderStatus === "Preparing" && (
                            <button className="btn btn-success" onClick={() => handleUpdateStatus("Ready")}>Mark Ready</button>
                          )}
                          {order.orderStatus === "Ready" && (
                            <button className="btn btn-secondary" onClick={() => handleUpdateStatus("Delivered")}>Mark Delivered</button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default VerifyToken;
