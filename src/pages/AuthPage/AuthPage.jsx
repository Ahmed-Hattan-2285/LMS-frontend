import "./styles.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import * as usersAPI from "../../utilities/users-api";

export default function AuthPage({ isLogin = true, setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "student",
    first_name: "",
    last_name: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const user = await usersAPI.login({
          username: formData.username,
          password: formData.password,
        });
        if (user && setUser) {
          setUser(user);
          navigate("/courses");
        } else {
          setError("Invalid credentials");
        }
      } else {
        const user = await usersAPI.register(formData);
        if (user && setUser) {
          setUser(user);
          navigate("/courses");
        } else {
          setError("Registration failed. Please try again.");
        }
      }
    } catch (err) {
      setError(err.error || err.message || "An error occurred. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isLogin ? "Login" : "Register"}</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="first_name">First Name:</label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Last Name:</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role:</label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="password2">Confirm Password:</label>
              <input
                type="password"
                name="password2"
                id="password2"
                value={formData.password2}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <button type="submit" className="btn-primary">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="auth-switch">
          {isLogin ? (
            <>
              Don't have an account? <Link to="/register">Register here</Link>
            </>
          ) : (
            <>
              Already have an account? <Link to="/login">Login here</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}