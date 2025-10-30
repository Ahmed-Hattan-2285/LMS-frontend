import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import blueBoard from "../../assets/images/blue-board.svg";

import * as lmsAPI from "../../utilities/lms-api";

export default function CourseForm() {
    const initialState = { title: "", instructor: "", description: "" }
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

    function handleChange(evt) {
      setFormData({ ...formData, [evt.target.name]: evt.target.value });
    }

    async function handleSubmit(evt) {
      evt.preventDefault();
      try {
        const newCourse = await lmsAPI.createCourse(formData);
        setFormData(initialState);
        navigate(`/courses/${newCourse.id}`);
      } catch (err) {
        console.log(err);
      }
    }

    return (
      <>
        <div className="page-header">
            <h1>Add a Course</h1>
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
      </>
    );
}
