import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/signup`, form);
      console.log("Response: ", response.data);
      alert("Registration Successful");
      setForm({ name: '', email: '', password: '' });
      navigate('/signin'); // Redirect to login page after successful registration
    } catch (error) {
      alert("Error, Try again!");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>SIGN UP</h1>
        <form onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input
            type="text"
            placeholder="John Stev"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />

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

          <button type="submit" className="signup-btn">Sign Up</button>

          <br></br>

          <span>Already have an account?</span>
          <button type="button" className="signin-btn" onClick={() => navigate('/signin')}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

