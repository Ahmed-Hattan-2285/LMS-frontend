import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import blueBoard from "../../assets/images/blue-board.svg";
import * as usersAPI from "../../utilities/users-api";

export default function SignupPage({ setUser }) {
    const navigate = useNavigate();
    const initialState = { username: "", password: "", confirmPassword: "", email: "", role: "student", first_name: "", last_name: "" };
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({ 
        username: '', 
        password: '', 
        email: '', 
        confirmPassword: '',
        first_name: '',
        last_name: ''
    });

    let disabledSubmitBtn = Object.values(errors).every(val => val === "") && 
                             Object.values(formData).every(val => val !== "") &&
                             formData.password === formData.confirmPassword ? false : true;

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        checkErrors(evt);
    }

    function checkErrors({ target }) {
        const updateErrors = { ...errors };

        if (target.name === 'username') {
            updateErrors.username = target.value.length < 3 ? 'Your username must be at least three characters long.' : "";
        }

        if (target.name === 'password') {
            updateErrors.password = target.value.length < 3 ? "Your password must be at least three characters long." : "";
        }

        if (target.name === 'confirmPassword') {
            updateErrors.confirmPassword = target.value !== formData.password ? "Your passwords must match." : "";
        }

        if (target.name === 'email') {
            updateErrors.email = !target.value.includes("@") ? "Your email must be a real email / include the '@' symbol." : "";
        }

        if (target.name === 'first_name') {
            updateErrors.first_name = target.value.length < 1 ? "First name is required." : "";
        }

        if (target.name === 'last_name') {
            updateErrors.last_name = target.value.length < 1 ? "Last name is required." : "";
        }

        setErrors(updateErrors);
    }

    async function handleSubmit(evt) {
        try {
            evt.preventDefault();
            console.log("checking handle submit signup");
            const signupData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                password2: formData.confirmPassword,
                first_name: formData.first_name,
                last_name: formData.last_name,
                role: formData.role
            };
            const newUser = await usersAPI.signup(signupData);
            setUser(newUser);
            setFormData(initialState);
            navigate("/courses");
        } catch (err) {
            console.log(err);
            setUser(null);
        }
    }

    return (
        <div className="signup-page-container">
            <div className="page-header">
                <h1>Sign Up</h1>
                <img src={blueBoard} alt="A board illustration" />
            </div>
            <form onSubmit={handleSubmit} className="form-container signup">
                <div className="form-grid">
                    <div className="form-group half-width">
                        <label htmlFor="id_first_name">First Name:</label>
                        <input 
                            type="text" 
                            value={formData.first_name} 
                            name="first_name" 
                            id="id_first_name"
                            minLength="1" 
                            maxLength="150" 
                            onChange={handleChange} 
                        />
                        {errors.first_name && <p className="error-text">{errors.first_name}</p>}
                    </div>
                    <div className="form-group half-width">
                        <label htmlFor="id_last_name">Last Name:</label>
                        <input 
                            type="text" 
                            value={formData.last_name} 
                            name="last_name" 
                            id="id_last_name"
                            minLength="1" 
                            maxLength="150" 
                            onChange={handleChange} 
                        />
                        {errors.last_name && <p className="error-text">{errors.last_name}</p>}
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="id_username">Username:</label>
                        <input 
                            type="text" 
                            value={formData.username} 
                            name="username" 
                            id="id_username"
                            minLength="3" 
                            maxLength="150" 
                            onChange={handleChange} 
                        />
                        {errors.username && <p className="error-text">{errors.username}</p>}
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="id_email">Email:</label>
                        <input 
                            type="email" 
                            value={formData.email} 
                            name="email" 
                            id="id_email"
                            minLength="3" 
                            maxLength="150" 
                            onChange={handleChange} 
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="id_role">Role:</label>
                        <select
                            name="role"
                            id="id_role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                        </select>
                    </div>
                    <div className="form-group half-width">
                        <label htmlFor="id_password">Password:</label>
                        <input 
                            type="password" 
                            value={formData.password} 
                            name="password" 
                            id="id_password"
                            minLength="3" 
                            onChange={handleChange} 
                        />
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>
                    <div className="form-group half-width">
                        <label htmlFor="id_password2">Confirm Password:</label>
                        <input 
                            type="password" 
                            value={formData.confirmPassword} 
                            name="confirmPassword" 
                            id="id_password2"
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                    </div>
                </div>
                <button type="submit" disabled={disabledSubmitBtn} className="btn submit">Create Account</button>
            </form>
        </div>
    );
}
