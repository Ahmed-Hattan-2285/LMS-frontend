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
                    <p>
                        {course.instructor && (
                            <span>
                                Instructor: <strong>
                                    {course.instructor.first_name || course.instructor.last_name 
                                        ? `${course.instructor.first_name || ''} ${course.instructor.last_name || ''}`.trim()
                                        : course.instructor.username}
                                </strong>
                            </span>
                        )}
                    </p>
                </div>
            </Link>
        </div>
    )
}