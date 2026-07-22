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
    key: "rzp_test_T3lq4b9ihdYtOt",
    amount: Math.round(amount * 100),
    currency: "INR",
    name: "Smart Mess",
    description: "Food Order Payment",
    prefill: {
      name,
      email,
      contact,
    },
    handler(response) {
      if (response.razorpay_payment_id) {
        onSuccess(response);
      }
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
