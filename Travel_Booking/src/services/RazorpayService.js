function loadRazorpayScript() {
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

const RazorpayService = {
  async initiatePayment({ amount, name, email, contact, packageName }) {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      return { success: false, error: "Failed to load payment gateway" };
    }

    const options = {
      key: "rzp_test_T3lq4b9ihdYtOt",
      amount: amount * 100,
      currency: "INR",
      name: "Travel Booking",
      description: packageName,
      prefill: {
        name: name,
        email: email,
        contact: contact,
      },
      theme: {
        color: "#FF6B35",
      },
    };

    return new Promise((resolve) => {
      options.handler = function (response) {
        resolve({
          success: true,
          razorpay_payment_id: response.razorpay_payment_id,
        });
      };

      options.modal = {
        ondismiss: function () {
          resolve({ success: false, error: "Payment cancelled" });
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        resolve({ success: false, error: response.error.description });
      });

      rzp.open();
    });
  },
};

export default RazorpayService;
