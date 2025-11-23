import React from 'react'
import '../forms.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await axios.post('http://localhost:3000/api/auth/user/register', {
      fullName: name, email, password
    },{ withCredentials: true });
    console.log("User Registered Successfully:", res.data);
    navigate('/');
  } catch (err) {
    console.error("Error registering user:", err.response ? err.response.data : err);
  }
};
    
  return (
    <div className="form-container">
      <div className="form-title">User Registration</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input className="form-input" type="text" name='name' placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" name='email' placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" name='password' placeholder="Enter password" />
        </div>
        <button className="form-button" type="submit">Register</button>
      </form>
      <div style={{marginTop: '18px', textAlign: 'center'}}>
        <a href="/food-partner/register" style={{color: 'var(--color-primary)', textDecoration: 'none'}}>Register as Food Partner</a>
        <br />
        <a href="/user/login" style={{color: 'var(--color-primary)', textDecoration: 'none'}}>Already a user? Login</a>
      </div>
    </div>
  )
}

export default UserRegister
