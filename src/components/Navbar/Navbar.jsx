import "./styles.css";
import { Link, useLocation } from 'react-router';
import redBoardLogo from '../../assets/images/red-board.svg';

export default function Navbar({ user, isLoading, onLogout }) {
  const location = useLocation();
  const routes = ["home", "courses", "about"];
  const mainCSS = routes.filter(r => location.pathname.includes(r) ? r : "").join(" ");

  return (
    <header>
      <div className="container">
        <div className={`${mainCSS} header-logo-container`}>
          <Link to="/">
            <img src={redBoardLogo} alt="Learning Management System Logo" />
          </Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            {user && user.role === 'instructor' && (
              <li><Link to="/courses/new">New Course</Link></li>
            )}
            <li><Link to="/about">About</Link></li>
          </ul>
          <div className="nav-auth">
            {!isLoading && (
              user ? (
                <div className="user-menu">
                  <span className="user-info">
                    <span className="user-name">{user.username}</span>
                    <span className="user-role">({user.role})</span>
                  </span>
                  <button onClick={onLogout} className="logout-btn">Logout</button>
                </div>
              ) : (
                <div className="auth-links">
                  <Link to="/login" className="login-btn">Login</Link>
                  <Link to="/register" className="register-btn">Sign Up</Link>
                </div>
              )
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
