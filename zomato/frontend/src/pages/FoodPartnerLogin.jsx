import React from 'react'
import '../forms.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function FoodPartnerLogin() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post('http://localhost:3000/api/auth/food-partner/login', {
        email,
        password
      }, { withCredentials: true });
      console.log("Food Partner Logged In Successfully:", res.data);
      navigate('/create-food');
    } catch (err) {
      console.error("Error logging in food partner:", err.response ? err.response.data : err);
    }
  }

  return (
    <div className="form-container">
      <div className="form-title">Food Partner Login</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" name="email" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" name="password" placeholder="Enter password" />
        </div>
        <button className="form-button" type="submit">Login</button>
      </form>
      <div style={{marginTop: '18px', textAlign: 'center'}}>
        <a href="/user/login" style={{color: 'var(--color-primary)', textDecoration: 'none'}}>Login as Normal User</a>
        <br />
        <a href="/food-partner/register" style={{color: 'var(--color-primary)', textDecoration: 'none'}}>New partner? Register</a>
      </div>
    </div>
  )
}

export default FoodPartnerLogin
