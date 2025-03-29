import React, {useState, useEffect} from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import "../styles/Login.css"


const Login = () => {

    const [formData, setFormData] = useState({
      email: "",
      password: ""
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (location.state?.successMessage) {
        setSuccessMessage(location.state.successMessage);
        window.history.replaceState({}, document.title);
      }
      
      const lastUser = localStorage.getItem('lastLoggedInUser');
      if (lastUser) {
        const userData = JSON.parse(lastUser);
        setFormData(prev => ({
          ...prev,
          email: userData.email || ""
        }));
      }
    }, [location]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
      const { email, password } = formData;
  
      if (!email || !password) {
        setError("All fields are required!");
        return;
      }
  
      const storedUser = JSON.parse(localStorage.getItem("user"));
  
      if (!storedUser) {
        setError("No user found. Please sign up.");
        return;
      }
  
      if (storedUser.email !== email || storedUser.password !== password) {
        setError("Invalid credentials");
        return;
      }
  
      setError("");
      
      localStorage.setItem("isLoggedIn", "true");
      
      navigate("/dashboard");
    };
  
  
return (
  <div className='login-container'>
    <form className='login-form' onSubmit={handleLogin}>
      <h2>Login</h2>

      {successMessage && <p className='success'>{successMessage}</p>}
      {error && <p className='error'>{error}</p>}

      <div className="input-group">
        <label htmlFor="email">Email:</label>
        <input 
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete='email'
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input 
          type='password'
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete='current-password'
        />
      </div>

      <button type='submit'>Login</button>

      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </form>    
  </div>
);
};

export default Login



