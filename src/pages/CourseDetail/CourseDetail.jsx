import "./styles.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import * as lmsAPI from "../../utilities/lms-api";
import blueBoard from "../../assets/images/blue-board.svg";
import AddCoverForm from "../../components/Forms/AddCoverForm";

export default function CourseDetail() {
    const [courseDetail, setCourseDetail] = useState(null);
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

    async function addCover(id, formData) {
        try {
            await lmsAPI.addCover(id, formData);
            const updatedCourse = await lmsAPI.courseDetail(id);
            setCourseDetail(updatedCourse);
        } catch (err) {
            console.error(err);
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
                </div>
                <p>{courseDetail.description}</p>
            </div>
            <div className="course-lessons">
                <div className="course-lessons-header">
                    <h3>Lessons</h3>
                    <Link to={`/courses/${courseDetail.id}/lessons/new`} className="btn">Add Lesson</Link>
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
            <div className="course-actions">
                <Link to={`/courses/${courseDetail.id}/edit`} className="edit btn">Edit</Link>
                <Link to={`/courses/confirm_delete/${courseDetail.id}`} className="delete btn">Delete</Link>
            </div>
            <section className="photo-form-section">
                <AddCoverForm id={courseDetail.id} addCover={addCover} />
            </section>
        </section>
    );
}
