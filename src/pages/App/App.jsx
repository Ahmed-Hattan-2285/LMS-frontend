import "./App.css"
import { Route, Routes, Link } from 'react-router';
import { useLocation, Navigate } from 'react-router';
import HomePage from '../HomePage/HomePage';
import AboutPage from '../AboutPage/AboutPage';
import CourseList from '../CourseList/CourseList';
import CourseDetail from '../CourseDetail/CourseDetail';
import redBoardLogo from '../../assets/images/red-board.svg';

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
              <li><Link to="/about">About</Link></li>
              <li><Link to="/courses">All Courses</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </>
  );
}