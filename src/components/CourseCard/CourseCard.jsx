import "./styles.css";
import courseBoard from "../../assets/images/blue-board.svg";

export default function CourseCard({ course }) {

    return (
        <div className="course-index-card">
            <div className="course-index-card-content">
                <img src={courseBoard} alt="Course board illustration" />
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <p>
                    {course.instructor && (
                        <span>
                            Instructor: <strong>{course.instructor}</strong>
                        </span>
                    )}
                </p>
            </div>
        </div>
    )
}