import "./styles.css";
import { Link, useLocation } from "react-router";

export default function Sidebar({ user, isOpen, onToggle }) {
    const location = useLocation();

    const menuItems = [
        { path: "/", label: "Home"},
        { path: "/courses", label: "My Courses"},
        { path: "/courses/new", label: "Create Course"},
        { path: "/about", label: "About"},
    ];

    return (
        <>
            <aside className={`instructor-sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h2>Instructor Panel</h2>
                    <button className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
                        {isOpen ? '←' : '→'}
                    </button>
                </div>
            <nav className="sidebar-nav">
                <ul className="sidebar-menu">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`sidebar-link ${
                                    location.pathname === item.path ||
                                    (item.path !== "/" && location.pathname.startsWith(item.path))
                                        ? "active"
                                        : ""
                                }`}
                            >
                                <span className="sidebar-label">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebar-footer">
                <div className="sidebar-user-info">
                    <span className="sidebar-user-name">{user?.username}</span>
                    <span className="sidebar-user-role">Instructor</span>
                </div>
            </div>
        </aside>
            {!isOpen && (
                <button className="sidebar-toggle-float" onClick={onToggle} aria-label="Open sidebar">
                    →
                </button>
            )}
        </>
    );
}

