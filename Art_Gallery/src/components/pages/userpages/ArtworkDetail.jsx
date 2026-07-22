import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ArtworkService from "../../../services/ArtworkService";
import OrderService from "../../../services/OrderService";
import ReviewService from "../../../services/ReviewService";
import { loadRazorpayScript, openRazorpay } from "../../../services/RazorpayService";
import AuthServices from "../../../helpers/AuthServices";

function ArtworkDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [load, setLoad] = useState(false);
  const [artwork, setArtwork] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  useEffect(() => {
    loadArtwork();
    loadReviews();
  }, [id]);

  const loadArtwork = async () => {
    setLoad(true);
    try {
      const data = await ArtworkService.getSingle(id);
      setArtwork(data);
    } catch (error) {
      console.log(error);
    }
    setLoad(false);
  };

  const loadReviews = async () => {
    try {
      const data = await ReviewService.getByArtwork(id);
      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyNow = async () => {
    const user = AuthServices.getUser();
    if (!user) {
      nav("/login");
      return;
    }
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Failed to load payment gateway");
      return;
    }
    openRazorpay({
      amount: artwork.price,
      name: user.name,
      email: user.email,
      contact: user.contact,
      onSuccess: async (response) => {
        try {
          await OrderService.add({
            userId: user.uid,
            userName: user.name,
            email: user.email,
            contact: user.contact,
            artworkId: artwork.id,
            artworkTitle: artwork.title,
            artworkImage: artwork.imageUrl,
            price: artwork.price,
            paymentId: response.razorpay_payment_id,
            paymentStatus: "Paid",
            orderStatus: "Pending",
            deliveryAddress: user.address || "",
          });
          await ArtworkService.update(id, { availability: "Sold" });
          setArtwork({ ...artwork, availability: "Sold" });
          Swal.fire({
            title: "Payment Successful!",
            text: "Your order has been placed.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            nav("/my-orders");
          });
        } catch (error) {
          toast.error(error.message);
        }
      },
      onError: (err) => {
        toast.error(err || "Payment failed");
      },
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const user = AuthServices.getUser();
    if (!user) {
      nav("/login");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }
    setLoad(true);
    try {
      await ReviewService.add({
        userId: user.id || user.uid,
        userName: user.name,
        artworkId: id,
        rating,
        review: comment,
      });
      toast.success("Review submitted");
      setComment("");
      setRating("5");
      loadReviews();
    } catch (error) {
      toast.error(error.message);
    }
    setLoad(false);
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
              <h2>ARTWORK DETAILS</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="contact_area p_120">
        <div className="container">
          {artwork && (
            <>
              <div className="row">
                <div className="col-lg-6">
                  {artwork.imageUrl && (
                    <img
                      className="img-fluid"
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      style={{ width: "100%", maxHeight: 500, objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="col-lg-6">
                  <h2>{artwork.title}</h2>
                  <p><strong>Artist:</strong> {artwork.artistName}</p>
                  <p><strong>Category:</strong> {artwork.categoryName}</p>
                  <p><strong>Price:</strong> ₹{artwork.price}</p>
                  <p><strong>Availability:</strong> {artwork.availability}</p>
                  <p>{artwork.description}</p>
                  {artwork.availability === "Available" && (
                    <button className="btn submit_btn" onClick={handleBuyNow}>
                      Buy Now
                    </button>
                  )}
                  {artwork.availability === "Sold" && (
                    <span className="badge bg-secondary p-2">Sold Out</span>
                  )}
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-lg-12">
                  <h3>Reviews</h3>
                  <div className="mt-3">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="border-bottom p-3"
                      >
                        <strong>{rev.userName}</strong> - <span>Rating: {rev.rating}/5</span>
                        <p className="mb-0">{rev.review}</p>
                      </div>
                    ))}
                    {reviews.length === 0 && <p>No reviews yet.</p>}
                  </div>
                  <div className="mt-4">
                    <h4>Write a Review</h4>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="form-group mb-3">
                        <select
                          className="form-control"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="form-group mb-3">
                        <textarea
                          className="form-control"
                          rows={4}
                          placeholder="Your review..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn submit_btn">
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default ArtworkDetail;
