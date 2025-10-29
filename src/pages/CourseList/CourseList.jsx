import "./styles.css";
import { useState, useEffect } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import blueBoard from "../../assets/images/blue-board.svg";
import checkBoard from "../../assets/images/check-mark-board.svg";
import redBoard from "../../assets/images/red-board.svg";
import yellowBoard from "../../assets/images/yellow-board.svg";

import * as lmsAPI from "../../utilities/lms-api";

export default function CourseList() {
    const [allCourses, setAllCourses] = useState([]);

    const displayAllCourses = allCourses.map((c, idx) => (
        <CourseCard key={idx} course={c} />
    ))
    useEffect(function () {
        async function getAllCourses() {
            const allCoursesData = await lmsAPI.coursesIndex()
            setAllCourses(allCoursesData)
        }
        if (allCourses.length === 0) getAllCourses()
    }, [])

    return (<>
        <section className="page-header">
            <h1>Course List</h1>
            <div className="board-images">
                <img src={blueBoard} alt="Blue Board" />
                <img src={checkBoard} alt="Check Mark Board" />
                <img src={redBoard} alt="Red Board" />
                <img src={yellowBoard} alt="Yellow Board" />
            </div>
        </section>
        <section className="index-card-container">
            {displayAllCourses}
        </section>
    </>)
}