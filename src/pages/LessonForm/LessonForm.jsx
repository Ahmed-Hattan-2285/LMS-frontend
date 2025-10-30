import "./styles.css";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import * as lmsAPI from "../../utilities/lms-api";

export default function LessonForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", video_url: "", duration: "" });

  function handleChange(evt) {
    const next = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(next);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const payload = {
      course: Number(id),
      title: formData.title,
      video_url: formData.video_url,
      duration: Number(formData.duration) * 60 || 0,
    };
    const created = await lmsAPI.createLesson(payload);
    if (created && created.id) navigate(`/courses/${id}`);
  }

  return (
    <section className="form-page">
      <div className="page-header">
        <h1>Add Lesson</h1>
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
                  maxLength="255"
                  required
                  id="id_title"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th><label htmlFor="id_video_url">Video URL:</label></th>
              <td>
                <input
                  value={formData.video_url}
                  type="url"
                  name="video_url"
                  id="id_video_url"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th><label htmlFor="id_duration">Duration (minutes):</label></th>
              <td>
                <input
                  value={formData.duration}
                  type="number"
                  name="duration"
                  id="id_duration"
                  min="0"
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="form-actions">
          <Link to={`/courses/${id}`} className="btn secondary">Cancel</Link>
          <button type="submit" className="btn end submit">Save Lesson</button>
        </div>
      </form>
    </section>
  );
}


