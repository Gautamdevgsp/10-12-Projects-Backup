import axios from "axios";

const RAZORPAY_KEY = "rzp_test_T3lq4b9ihdYtOt";
const RAZORPAY_SECRET = "oCEaQ7Yj3M5m6FnUMaB9TE70";

export async function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function openRazorpay({ amount, name, email, contact, onSuccess, onError }) {
  const options = {
    key: RAZORPAY_KEY,
    amount: Math.round(amount * 100),
    currency: "INR",
    name: "Restoran",
    description: "Table Booking Payment",
    prefill: { name, email, contact },
    handler(response) {
      if (response.razorpay_payment_id) onSuccess(response);
    },
    modal: {
      ondismiss() {
        onError?.("Payment cancelled by user");
      },
    },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
}

export async function processRefund(paymentId, amount) {
  try {
    const auth = btoa(`${RAZORPAY_KEY}:${RAZORPAY_SECRET}`);
    const res = await axios.post(
      `https://api.razorpay.com/v1/payments/${paymentId}/refund`,
      { amount: Math.round(amount * 100) },
      { headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" } }
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.response?.data?.error?.description || err.message };
  }
}
