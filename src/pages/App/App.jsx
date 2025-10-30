import "./App.css"
import { Route, Routes, Link, useLocation, Navigate } from 'react-router';
import HomePage from '../HomePage/HomePage';
import AboutPage from '../AboutPage/AboutPage';
import CourseList from '../CourseList/CourseList';
import CourseDetail from '../CourseDetail/CourseDetail';
import redBoardLogo from '../../assets/images/red-board.svg';
import CourseForm from '../CourseForm/CourseForm';
import LessonForm from '../LessonForm/LessonForm';

export default function App() {
  const location = useLocation();

  const routes = ["home", "courses", "about"]
  const mainCSS = routes.filter(r => location.pathname.includes(r) ? r : "").join(" ")

  return (
    <>
      <header>
        <div className="container">
          <div className={`${mainCSS} header-logo-container`}>
            <Link to="/">
              <img src={redBoardLogo} alt="Learning Management System Logo" />
            </Link>
          </div>
          <nav>
            <ul>
              <li><Link to="/courses">All Courses</Link></li>
              <li><Link to="/courses/new">New Course</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/new" element={<CourseForm createCourse={true}/>} />
          <Route path="/courses/:id/edit" element={<CourseForm editCourse={true}/>} />
          <Route path="/courses/confirm_delete/:id" element={<CourseForm deleteCourse={true}/>} />
          <Route path="/courses/:id/lessons/new" element={<LessonForm />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </>
  );
}