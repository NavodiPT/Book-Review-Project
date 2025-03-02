import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ViewPosts.css";

export default function Views() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  // Fetch all reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Delete a review
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
      alert("Review deleted successfully!");
    } catch (error) {
      alert("Failed to delete the review.");
    }
  };

  return (
    <div className="view-posts-container">
      <h1>📚 Book Reviews</h1>

      {/* Create New Review Button */}
      <button className="create-review-btn" onClick={() => navigate("/create")}>
        + Create a New Review
      </button>

      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews available. Add a new one!</p>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div className="review-card" key={review._id}>
              <h2>{review.title}</h2>
              <p><strong>Author:</strong> {review.author}</p>
              <p><strong>Rating:</strong> ⭐ {review.rating}/5</p>
              <p><strong>Review:</strong> {review.review}</p>
              <p><strong>Date:</strong> {new Date(review.date).toDateString()}</p>

              {/* Action Buttons */}
              <div className="review-actions">
                <button className="update-btn" onClick={() => navigate(`/update/${review._id}`)}>
                  ✏️ Update
                </button>
                <button className="delete-btn" onClick={() => handleDelete(review._id)}>
                  ❌ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

