import "./styles.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import * as lmsAPI from "../../utilities/lms-api";

export default function LessonForm({ createLesson: createMode, editLesson, deleteLesson: deleteMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialState = { title: "", video_url: "", duration: "" };
  const [formData, setFormData] = useState(initialState);
  const [currLesson, setCurrLesson] = useState(null);

  useEffect(() => {
    async function getAndSetDetail() {
      try {
        const lesson = await lmsAPI.lessonDetail(id);
        setCurrLesson(lesson);
        setFormData({
          title: lesson.title || "",
          video_url: lesson.video_url || "",
          duration: lesson.duration ? Math.floor(lesson.duration / 60) : "",
        });
      } catch (err) {
        console.log(err);
        setCurrLesson(null);
        setFormData(initialState);
      }
    }
    if ((editLesson || deleteMode) && id) getAndSetDetail();
  }, [id, editLesson, deleteMode]);

  function handleChange(evt) {
    const next = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(next);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const courseIdToUse = createMode ? Number(id) : currLesson?.course;
    const payload = {
      course: courseIdToUse,
      title: formData.title,
      video_url: formData.video_url,
      duration: Number(formData.duration) * 60 || 0,
    };
    
    if (editLesson) {
      const updated = await lmsAPI.updateLesson(currLesson.id, payload);
      if (updated && updated.id) navigate(`/courses/${courseIdToUse}`);
    } else {
      const created = await lmsAPI.createLesson(payload);
      if (created && created.id) navigate(`/courses/${courseIdToUse}`);
    }
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    const courseIdToUse = currLesson?.course;
    await lmsAPI.deleteLesson(currLesson.id);
    navigate(`/courses/${courseIdToUse}`);
  }

  if (deleteMode && !currLesson) return <h1>Loading</h1>;
  if (deleteMode && currLesson) {
    const courseIdToUse = currLesson.course;
    return (
      <>
        <div className="page-header">
          <h1>Delete Lesson?</h1>
        </div>
        <h2>Are you sure you want to delete {currLesson.title}?</h2>
        <form onSubmit={handleDelete}>
          <Link to={`/courses/${courseIdToUse}`} className="btn secondary">Cancel</Link>
          <button type="submit" className="btn delete">Yes - Delete!</button>
        </form>
      </>
    );
  }

  if (editLesson && !currLesson) return <h1>Loading</h1>;
  
  const courseIdToUse = createMode ? Number(id) : currLesson?.course;
  
  return (
    <section className="form-page">
      <div className="page-header">
        {editLesson ? <h1>Edit {currLesson?.title}</h1> : <h1>Add Lesson</h1>}
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
          {editLesson ? (
            <Link to={`/courses/${courseIdToUse}`} className="btn secondary">Cancel</Link>
          ) : (
            <Link to={`/courses/${courseIdToUse}`} className="btn secondary">Cancel</Link>
          )}
          <button type="submit" className="btn end submit">Save Lesson</button>
        </div>
      </form>
    </section>
  );
}


