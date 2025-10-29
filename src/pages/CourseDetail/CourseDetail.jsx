import "./styles.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import * as lmsAPI from "../../utilities/lms-api";
import blueBoard from "../../assets/images/blue-board.svg";

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

    if (!courseDetail) return <h3>Your course details will display soon</h3>;

    return (
        <section className="detail-course-container">
          <div className="detail-course-img">
            <img src={blueBoard} alt="Course board illustration" />
          </div>
          <div className="course-details">
            <h1>{ courseDetail.title }</h1>
            <h2>
                {courseDetail.instructor 
                    ? `Instructor: ${courseDetail.instructor}` 
                    : "No instructor listed."}
            </h2>
            <p>{ courseDetail.description }</p>
          </div>
        </section>
    );
}
