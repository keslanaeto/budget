
import './App.css'
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'



const App = () => {
  const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    return !!user || isLoggedIn;
  };

  return (
    <div className="app-container">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App
