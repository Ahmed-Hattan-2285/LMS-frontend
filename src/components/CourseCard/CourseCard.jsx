import "./styles.css";
import courseBoard from "../../assets/images/blue-board.svg";
import { Link } from "react-router";

export default function CourseCard({ course }) {

    return (
        <div className="course-index-card">
            <Link to={`/courses/${course.id}`}>
                <div className="course-index-card-content">
                    {course.course_cover?.url
                        ? <img src={course.course_cover.url} alt={`Cover for course ${course.title}`} />
                        : <img src={courseBoard} alt="Course board illustration" />}
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                    <div className="course-meta">
                        {course.instructor && (
                            <p>
                                <span>
                                    Instructor: <strong>
                                        {course.instructor.first_name || course.instructor.last_name 
                                            ? `${course.instructor.first_name || ''} ${course.instructor.last_name || ''}`.trim()
                                            : course.instructor.username}
                                    </strong>
                                </span>
                            </p>
                        )}
                        {course.average_rating !== null && course.average_rating !== undefined && (
                            <p className="course-rating">
                                ⭐ {course.average_rating}/5 
                                {course.rating_count > 0 && (
                                    <span className="rating-count">({course.rating_count} {course.rating_count === 1 ? 'review' : 'reviews'})</span>
                                )}
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    )
}