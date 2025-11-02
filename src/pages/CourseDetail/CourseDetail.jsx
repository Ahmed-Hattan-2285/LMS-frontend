import "./styles.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import * as lmsAPI from "../../utilities/lms-api";
import * as usersAPI from "../../utilities/users-api";
import blueBoard from "../../assets/images/blue-board.svg";
import AddCoverForm from "../../components/Forms/AddCoverForm";
import ReviewForm from "../../components/Forms/ReviewForm";

export default function CourseDetail() {
    const [courseDetail, setCourseDetail] = useState(null);
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function getAndSetDetail() {
            try {
                const course = await lmsAPI.courseDetail(id);
                setCourseDetail(course);
            } catch (err) {
                console.log(err);
                setCourseDetail(null);
            }
        }
        if (id) getAndSetDetail();
    }, [id]);

    useEffect(() => {
        async function getUser() {
            const foundUser = await usersAPI.getUser();
            setUser(foundUser);
        }
        getUser();
    }, []);

    async function addCover(id, formData) {
        try {
            await lmsAPI.addCover(id, formData);
            const updatedCourse = await lmsAPI.courseDetail(id);
            setCourseDetail(updatedCourse);
        } catch (err) {
            console.error(err);
        }
    }

    async function addReview(reviewData) {
        try {
            await lmsAPI.createReview({ ...reviewData, course: parseInt(id) });
            const updatedCourse = await lmsAPI.courseDetail(id);
            setCourseDetail(updatedCourse);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async function updateReview(reviewId, reviewData) {
        try {
            await lmsAPI.updateReview(reviewId, reviewData);
            const updatedCourse = await lmsAPI.courseDetail(id);
            setCourseDetail(updatedCourse);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    if (!courseDetail) return <h3>Your course details will display soon</h3>;

    return (
        <section className="detail-course-container">
            <div className="course-header">
                <h1>{courseDetail.title}</h1>
                <h2>
                    {courseDetail.instructor
                        ? `Instructor: ${courseDetail.instructor.first_name || courseDetail.instructor.last_name 
                            ? `${courseDetail.instructor.first_name || ''} ${courseDetail.instructor.last_name || ''}`.trim()
                            : courseDetail.instructor.username} (${courseDetail.instructor.username})`
                        : "No instructor listed."}
                </h2>
            </div>
            <div className="detail-course-img">
                {courseDetail.course_cover?.url
                    ? <img src={courseDetail.course_cover.url} alt={`Cover for course ${courseDetail.title}`} />
                    : <img src={blueBoard} alt="Course board illustration" />
                }
            </div>
            <div className="course-details">
                <div className="course-meta">
                    {courseDetail.category && (
                        <div className="course-meta-item">
                            <strong>Category:</strong> {courseDetail.category}
                        </div>
                    )}
                    {courseDetail.lessons && courseDetail.lessons.length > 0 && (
                        <div className="course-meta-item">
                            <strong>Lessons:</strong> {courseDetail.lessons.length}
                        </div>
                    )}
                    {courseDetail.average_rating !== null && courseDetail.average_rating !== undefined && (
                        <div className="course-meta-item">
                            <strong>Rating:</strong> ⭐ {courseDetail.average_rating}/5 
                            {courseDetail.rating_count > 0 && (
                                <span> ({courseDetail.rating_count} {courseDetail.rating_count === 1 ? 'review' : 'reviews'})</span>
                            )}
                        </div>
                    )}
                </div>
                <p>{courseDetail.description}</p>
            </div>
            <div className="course-lessons">
                <div className="course-lessons-header">
                    <h3>Lessons</h3>
                    {user && user.role === 'instructor' && (
                        <Link to={`/courses/${courseDetail.id}/lessons/new`} className="btn">Add Lesson</Link>
                    )}
                </div>
                {courseDetail.lessons && courseDetail.lessons.length > 0 ? (
                    <ul>
                        {courseDetail.lessons.map(l => (
                            <li key={l.id}>
                                <strong>{l.title}</strong>
                                {l.video_url && (
                                    <>
                                        {" "}
                                        <a href={l.video_url} target="_blank" rel="noreferrer">Watch</a>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No lessons yet.</p>
                )}
            </div>
            {user && user.role === 'instructor' && (
                <div className="course-actions">
                    <Link to={`/courses/${courseDetail.id}/edit`} className="edit btn">Edit</Link>
                    <Link to={`/courses/confirm_delete/${courseDetail.id}`} className="delete btn">Delete</Link>
                </div>
            )}
            <div className="course-reviews">
                <h3>Reviews</h3>
                {courseDetail.reviews && courseDetail.reviews.length > 0 ? (
                    <div className="reviews-list">
                        {courseDetail.reviews.map(review => (
                            <div key={review.id} className="review-item">
                                <div className="review-header">
                                    <strong>
                                        {review.student.first_name || review.student.last_name 
                                            ? `${review.student.first_name || ''} ${review.student.last_name || ''}`.trim()
                                            : review.student.username}
                                    </strong>
                                    <span className="review-rating"> ⭐ {review.rating}/5</span>
                                    <span className="review-date">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                {review.comment && (
                                    <p className="review-comment">{review.comment}</p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No reviews yet. Be the first to review this course!</p>
                )}
                {user && user.role === 'student' && (
                    <ReviewForm 
                        courseId={courseDetail.id} 
                        addReview={addReview}
                        updateReview={updateReview}
                        courseDetail={courseDetail}
                        user={user}
                    />
                )}
            </div>
            {user && user.role === 'instructor' && (
                <section className="photo-form-section">
                    <AddCoverForm id={courseDetail.id} addCover={addCover} />
                </section>
            )}
        </section>
    );
}
