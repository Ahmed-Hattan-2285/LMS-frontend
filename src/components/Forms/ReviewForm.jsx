import { useState, useEffect } from "react";

export default function ReviewForm({ courseId, addReview, updateReview, deleteReview, courseDetail, user }) {
    const [formData, setFormData] = useState({
        rating: 5,
        comment: ""
    });
    const [error, setError] = useState("");
    const [existingReview, setExistingReview] = useState(null);

    useEffect(() => {
        if (courseDetail?.reviews && user?.id) {
            const myReview = courseDetail.reviews.find(r => r.student?.id === user.id);
            if (myReview) {
                setExistingReview(myReview);
                setFormData({
                    rating: myReview.rating,
                    comment: myReview.comment || ""
                });
            } else {
                setExistingReview(null);
                setFormData({ rating: 5, comment: "" });
            }
        }
    }, [courseDetail, user]);

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        setError("");
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        setError("");
        try {
            const reviewData = {
                rating: parseInt(formData.rating),
                comment: formData.comment || null
            };
            
            if (existingReview && updateReview) {
                reviewData.course = parseInt(courseId);
                await updateReview(existingReview.id, reviewData);
            } else {
                await addReview(reviewData);
            }
            
            if (!existingReview) {
                setFormData({ rating: 5, comment: "" });
            }
        } catch (err) {
            console.error(err);
            if (err.data) {
                if (typeof err.data === 'object' && !Array.isArray(err.data)) {
                    if (err.data.error) {
                        setError(err.data.error);
                    } else {
                        const errorMessages = Object.entries(err.data).map(([field, messages]) => {
                            const msgArray = Array.isArray(messages) ? messages : [messages];
                            return `${field}: ${msgArray.join(', ')}`;
                        });
                        setError(errorMessages.join('; ') || "Validation error");
                    }
                } else if (typeof err.data === 'string') {
                    setError(err.data);
                } else {
                    setError(err.data.error || "Validation error");
                }
            } else {
                setError(err.message || "Failed to submit review");
            }
        }
    }

    async function handleDelete(evt) {
        evt.preventDefault();
        if (!existingReview || !deleteReview) return;
        
        const confirmed = window.confirm("Are you sure you want to delete your review? This action cannot be undone.");
        if (!confirmed) return;

        setError("");
        try {
            await deleteReview(existingReview.id);
            setExistingReview(null);
            setFormData({ rating: 5, comment: "" });
        } catch (err) {
            console.error(err);
            if (err.data) {
                if (typeof err.data === 'object' && !Array.isArray(err.data)) {
                    if (err.data.error) {
                        setError(err.data.error);
                    } else {
                        setError(err.data.error || "Failed to delete review");
                    }
                } else if (typeof err.data === 'string') {
                    setError(err.data);
                } else {
                    setError(err.data.error || "Failed to delete review");
                }
            } else {
                setError(err.message || "Failed to delete review");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>{existingReview ? "Update Your Review" : "Write a Review"}</h3>
            {error && <p className="error-message">{error}</p>}
            {existingReview && (
                <p className="info-message" style={{ color: '#0058b2', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    You've already reviewed this course. Update your review below or delete it:
                </p>
            )}
            <p>
                <label htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    name="rating"
                    id="rating"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                />
                <span> (1-5 stars)</span>
            </p>
            <p>
                <label htmlFor="comment">Comment (optional):</label>
                <textarea
                    name="comment"
                    id="comment"
                    rows="4"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Share your thoughts about this course..."
                />
            </p>
            <div className="review-form-actions">
                <button type="submit" className="btn submit">
                    {existingReview ? "Update Review" : "Submit Review"}
                </button>
                {existingReview && deleteReview && (
                    <button type="button" onClick={handleDelete} className="btn delete-review">
                        Delete Review
                    </button>
                )}
            </div>
        </form>
    );
}