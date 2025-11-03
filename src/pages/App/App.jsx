import "./App.css"
import { Route, Routes, Navigate } from 'react-router';
import { useState, useEffect } from 'react';
import HomePage from '../HomePage/HomePage';
import AboutPage from '../AboutPage/AboutPage';
import CourseList from '../CourseList/CourseList';
import CourseDetail from '../CourseDetail/CourseDetail';
import CourseForm from '../CourseForm/CourseForm';
import LessonForm from '../LessonForm/LessonForm';
import AuthPage from '../AuthPage/AuthPage';
import SignupPage from '../SignupPage/SignupPage';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import redBoardLogo from '../../assets/images/red-board.svg';
import * as usersAPI from '../../utilities/users-api';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function CheckUser() {
      const foundUser = await usersAPI.getUser();
      setUser(foundUser);
    }
    CheckUser();
  }, [])

  async function handleLogout() {
    await usersAPI.logout();
    setUser(null);
  }

  const isInstructor = user && user.role === 'instructor';
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {!isInstructor && <Navbar user={user} onLogout={handleLogout} />}
      {isInstructor && <div className="instructor-header">
        <div className="instructor-header-content">
          <div className="instructor-logo">
            <img src={redBoardLogo} alt="Learning Management System Logo" />
          </div>
          <div className="instructor-actions">
            <span className="instructor-name">{user?.username}</span>
            <button onClick={handleLogout} className="instructor-logout">Logout</button>
          </div>
        </div>
      </div>}
      <div className="app-container">
        {isInstructor && <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />}
        <main className={isInstructor && sidebarOpen ? 'with-sidebar' : ''}>
          <Routes>
          {user ? <>
            <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/new" element={<CourseForm createCourse={true}/>} />
            <Route path="/courses/:id/edit" element={<CourseForm editCourse={true}/>} />
            <Route path="/courses/confirm_delete/:id" element={<CourseForm deleteCourse={true}/>} />
            <Route path="/courses/:id/lessons/new" element={<LessonForm />} />
            <Route path="/*" element={<Navigate to="/courses" />} />
          </> : <>
            <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignupPage setUser={setUser} />} />
            <Route path="/login" element={<AuthPage isLogin={true} setUser={setUser} />} />
            <Route path="/register" element={<AuthPage isLogin={false} setUser={setUser} />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>}
          </Routes>
        </main>
      </div>
    </>
  );
}