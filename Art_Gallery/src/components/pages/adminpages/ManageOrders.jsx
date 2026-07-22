import React, { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import OrderService from "../../../services/OrderService";

function ManageOrders() {
  const [fetching, setFetching] = useState(true);
  const [orders, setOrders] = useState([]);

  const loadData = async () => {
    setFetching(true);
    try {
      const data = await OrderService.all();
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
    setFetching(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Change order status to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      try {
        await OrderService.updateOrderStatus(id, newStatus);
        toast.success("Order status updated successfully");
        loadData();
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const getNextStatus = (currentStatus) => {
    const flow = {
      Pending: "Confirmed",
      Confirmed: "Packed",
      Packed: "Shipped",
      Shipped: "Delivered",
    };
    return flow[currentStatus] || null;
  };

  const getStatusBadge = (status) => {
    const map = {
      Pending: "bg-warning",
      Confirmed: "bg-info",
      Packed: "bg-primary",
      Shipped: "bg-info",
      Delivered: "bg-success",
    };
    return map[status] || "bg-secondary";
  };

  const getPaymentBadge = (status) => {
    const map = {
      Pending: "bg-warning",
      Paid: "bg-success",
      Failed: "bg-danger",
    };
    return map[status] || "bg-secondary";
  };

  if (fetching) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <HashLoader size={80} color="#0F172B" />
      </div>
    );
  }

  return (
    <>
      <section className="banner_area">
        <div className="banner_inner d-flex align-items-center">
          <div
            className="overlay bg-parallax"
            data-stellar-ratio="0.9"
            data-stellar-vertical-offset={0}
          />
          <div className="container">
            <div className="banner_content text-center">
              <h2>MANAGE ORDERS</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          <h4 className="mb-4">All Orders</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Artwork</th>
                <th>Price</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.userName}</td>
                    <td>{order.artworkTitle}</td>
                    <td>&#8377;{order.price}</td>
                    <td>
                      <span className={`badge ${getPaymentBadge(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</td>
                    <td>
                      {getNextStatus(order.orderStatus) && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleStatusChange(order.id, getNextStatus(order.orderStatus))}
                        >
                          {getNextStatus(order.orderStatus)}
                        </button>
                      )}
                      {!getNextStatus(order.orderStatus) && (
                        <span className="text-muted">Completed</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </>
  );
}

export default ManageOrders;
