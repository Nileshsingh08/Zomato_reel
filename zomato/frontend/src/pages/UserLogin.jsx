import React from 'react'
import '../forms.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function UserLogin() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  
  try{
    const res = await axios.post(`http://localhost:3000/api/auth/user/login`, {
      email, password
    },{ withCredentials: true });
    console.log("User Logged In Successfully:", res.data);
    navigate('/');
  } catch (err) {
    console.error("Error logging in user:", err.response ? err.response.data : err);
  }
}
  return (
    <div className="form-container">
      <div className="form-title">User Login</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" name="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" name="password" placeholder="Enter password" />
        </div>
        <button className="form-button" type="submit">Login</button>
      </form>
      <div style={{marginTop: '18px', textAlign: 'center'}}>
        <a href="/food-partner/login" style={{color: 'var(--color-primary)', textDecoration: 'none'}}>Login as Food Partner</a>
        <br />
        <a href="/user/register" style={{color: 'var(--color-primary)', textDecoration: 'none'}}>New user? Register</a>
      </div>
    </div>
  )
}

export default UserLogin
