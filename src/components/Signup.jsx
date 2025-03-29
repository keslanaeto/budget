import React, { useState, } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/SignUp.css"


  const SignUp = () => {
    const [formData, setFormData] = useState({
      nickname: "",
      email: "",
      password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const validateEmail = (email) => {
      return /^\S+@\S+\.\S+$/.test(email);
    };
  
    const validatePassword = (password) => {
      return password.length >= 6;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      const { nickname, email, password } = formData;
  
      if (!nickname || !email || !password) {
        setError("All fields are required!");
        return;
      }
  
      if (!validateEmail(email)) {
        setError("Invalid email format!");
        return;
      }
  
      if (!validatePassword(password)) {
        setError("Password must be at least 6 characters long!");
        return;
      }
  
      setError("");
  
      const user = { nickname, email, password };
      localStorage.setItem("user", JSON.stringify(user));
  
      navigate("/login", { 
        state: { successMessage: "Signup successful! Please login." }
      });
    };



  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {error && <p className="error">{error}</p>}

        <div className="input-group">
          <label>Nickname:</label>
          <input         
            type="text" 
            id="nickname"
            name="nickname" 
            value={formData.nickname} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Email:</label>
          <input 
            type="email"
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input 
            type="password"
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit">Sign Up</button>

          <p>
            Already have an account? <Link to="/login">Login here</Link>

         </p>
      </form>
    </div>
  );
};

export default SignUp;
