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

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <main>
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
    </>
  );
}