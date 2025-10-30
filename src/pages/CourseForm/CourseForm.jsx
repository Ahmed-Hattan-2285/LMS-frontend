import "./styles.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import blueBoard from "../../assets/images/blue-board.svg";

import * as lmsAPI from "../../utilities/lms-api";

export default function CourseForm({ createCourse, editCourse, deleteCourse }) {
    const initialState = { title: "", instructor: "", description: "", category: "" }

    const [currCourse, setCurrCourse] = useState(null);
    const { id } = useParams();

    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

    useEffect(() => {
        async function getAndSetDetail() {
            try {
                const course = await lmsAPI.courseDetail(id);
                setCurrCourse(course);
                setFormData(course)
            } catch (err) {
                console.log(err)
                setCurrCourse(null)
                setFormData(initialState)
            }
        }
        if ((editCourse || deleteCourse) && id) getAndSetDetail()
    }, [id])

    function handleChange(evt) {
        const updatedData = { ...formData };
        setFormData({ ...updatedData, [evt.target.name]: evt.target.value })
    }

    async function handleSubmit(evt) {
        try {
            evt.preventDefault();
            const newCourse = editCourse ? await lmsAPI.updateCourse(formData, currCourse.id) : await lmsAPI.createCourse(formData);
            setFormData(initialState);
            navigate(`/courses/${newCourse.id}`);
        } catch (err) {
            console.log(err);
        }
    }
    async function handleDelete(evt) {
        evt.preventDefault();
        await lmsAPI.deleteCourse(currCourse.id)
        setFormData(initialState)
        navigate("/courses");
    }

    if (deleteCourse && !currCourse) return <h1>Loading</h1>
    if (deleteCourse && currCourse) return (<>
        <div className="page-header">
            <h1>Delete Course?</h1>
            <img src={blueBoard} alt="A Course with a blue board" />
        </div>
        <h2>Are you sure you want to delete {currCourse.title}?</h2>
        <form onSubmit={handleDelete}>
            <Link to={`/courses/${currCourse.id}`} className="btn secondary">Cancel</Link>
            <button type="submit" className="btn delete">Yes - Delete!</button>
        </form>
    </>)

    if (editCourse && !currCourse) return <h1>Loading</h1>
    if (createCourse || editCourse) return (<>
        <div className="page-header">
            {editCourse ? <h1>Edit {currCourse.title}'s Info</h1> : <h1>Add a Course</h1>}
            <img src={blueBoard} alt="A board with course icon" />
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <th><label htmlFor="id_title">Title:</label></th>
                        <td>
                            <input
                                value={formData.title}
                                type="text"
                                name="title"
                                maxLength="100"
                                required
                                id="id_title"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th><label htmlFor="id_instructor">Instructor:</label></th>
                        <td>
                            <input
                                value={formData.instructor}
                                type="text"
                                name="instructor"
                                maxLength="100"
                                required
                                id="id_instructor"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th><label htmlFor="id_category">Category:</label></th>
                        <td>
                            <input
                                value={formData.category}
                                type="text"
                                name="category"
                                maxLength="200"
                                required
                                id="id_category"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th><label htmlFor="id_description">Description:</label></th>
                        <td>
                            <textarea
                                value={formData.description}
                                name="description"
                                cols="40"
                                rows="10"
                                maxLength="250"
                                required
                                id="id_description"
                                onChange={handleChange}
                            ></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="btn end submit">Submit!</button>
        </form>
    </>)
}
