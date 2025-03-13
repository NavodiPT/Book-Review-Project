import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css'; 
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({
    email: '',  
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`http://localhost:5000/api/auth/signin`, form);

        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            alert("Login Successful");
            setForm({ email: '', password: '' });
            navigate('/views');  
          }
    } catch (error) {
      alert("Invalid credentials, Try again!");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="**********"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" className="login-btn">Sign In</button>

          <p>Don't have an account?</p>
          <button type="button" className="register-btn" onClick={() => navigate('/')}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
