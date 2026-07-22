import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
import OrderService from "../../../services/OrderService";
import { loadRazorpayScript, openRazorpay } from "../../../services/RazorpayService";

function Cart() {
  const [cart, setCart] = useState([]);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(sessionStorage.getItem("cart") || "[]"));
  }, []);

  const saveCart = (c) => {
    setCart(c);
    sessionStorage.setItem("cart", JSON.stringify(c));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    saveCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeFromCart = (id) => {
    saveCart(cart.filter((item) => item.id !== id));
    toast.info("Item removed from cart");
  };

  const getTotal = () => {
    return cart
      .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };

  const generateToken = () => {
    return "TKN" + Date.now().toString().slice(-6);
  };

  const handlePlaceOrder = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      toast.error("Please login to place an order!");
      nav("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const result = await Swal.fire({
      title: "Proceed to Payment?",
      text: `Total amount: ₹${getTotal()}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay Now",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setLoad(true);
    try {
      const ready = await loadRazorpayScript();
      if (!ready) {
        toast.error("Failed to load payment gateway");
        setLoad(false);
        return;
      }

      openRazorpay({
        amount: parseFloat(getTotal()),
        name: user.name,
        email: user.email,
        contact: user.contact,
        onSuccess: async (response) => {
          const tokenNumber = generateToken();
          await OrderService.add({
            userId: user.id,
            userName: user.name,
            email: user.email,
            contact: user.contact,
            tokenNumber,
            items: cart,
            totalAmount: getTotal(),
            orderStatus: "Pending",
            paymentStatus: "Paid",
            razorpayPaymentId: response.razorpay_payment_id,
            createdAt: new Date().toISOString(),
          });
          sessionStorage.removeItem("cart");
          Swal.fire({
            title: "Payment Successful!",
            text: `Your token number is ${tokenNumber}`,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => nav("/track-order"));
        },
        onError: (err) => {
          toast.error(err || "Payment failed");
        },
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoad(false);
    }
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
            <span className="slbl">Your Cart</span>
            <h2 className="stitle">
              Review <span>Cart</span> & Pay
            </h2>
            <div className="sline" />
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-5">
              <p>Your cart is empty</p>
              <button className="btn-red" onClick={() => nav("/place-order")}>
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="row justify-content-center">
              <div className="col-lg-8">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center justify-content-between mb-3 p-3"
                    style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.imageUrl || "img/menu/1.jpg"}
                        alt={item.name}
                        style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "6px" }}
                      />
                      <div>
                        <h6 className="mb-1" style={{ fontWeight: "600" }}>{item.name}</h6>
                        <span style={{ color: "#999", fontSize: "13px" }}>₹{item.price} each</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: "30px", height: "30px", border: "1px solid #ddd",
                          background: "#fff", cursor: "pointer", borderRadius: "4px",
                        }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: "20px", textAlign: "center", fontWeight: "600" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: "30px", height: "30px", border: "1px solid #ddd",
                          background: "#fff", cursor: "pointer", borderRadius: "4px",
                        }}
                      >
                        +
                      </button>
                      <span style={{ fontWeight: "600", minWidth: "60px", textAlign: "right" }}>
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          width: "30px", height: "30px", border: "none",
                          background: "#dc3545", color: "#fff", cursor: "pointer",
                          borderRadius: "4px", fontSize: "14px",
                        }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </div>
                ))}

                <div
                  className="p-3 mt-3 mb-5"
                  style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Total:</h5>
                    <h4 className="mb-0" style={{ color: "var(--primary)" }}>₹{getTotal()}</h4>
                  </div>
                  <button
                    className="btn-red"
                    style={{ width: "100%", marginTop: "15px" }}
                    onClick={handlePlaceOrder}
                  >
                    <i className="fas fa-credit-card me-2" /> Place Order & Pay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Cart;
