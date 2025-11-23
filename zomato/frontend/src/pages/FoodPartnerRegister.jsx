import React from 'react'
import '../forms.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function FoodPartnerRegister() {
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    try{
      const res = await axios.post('http://localhost:3000/api/auth/foodpartner/register', {
        businessName,
        contactName,
        phone,
        email,
        password,
        address
      },{ withCredentials: true });
      console.log("Food Partner Registered Successfully:", res.data);
      navigate('/create-food');
    }
    catch(err){
      console.error("Error registering food partner:", err.response ? err.response.data : err);
    }
  }
  return (
    <div className="form-container">
      <div className="form-title">Food Partner Registration</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Business Name</label>
          <input className="form-input" name='businessName' type="text" placeholder="Enter business name" />
        </div>
        <div className="form-group">
          <label className="form-label">Contact Name</label>
          <input className="form-input" name='contactName' type="text" placeholder="Enter contact name" />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className="form-input" name='phone' type="tel" placeholder="Enter phone number" />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" name='email' type="email" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" name='password' type="password" placeholder="Enter password" />
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <input className="form-input" name='address' type="text" placeholder="Enter address" />
        </div>
        <button className="form-button" type="submit">Register</button>
      </form>
      <div style={{marginTop: '18px', textAlign: 'center'}}>
        <a href="/user/register" style={{color: 'var(--color-primary)', textDecoration: 'none'}}>Register as Normal User</a>
        <br />
        <a href="/food-partner/login" style={{color: 'var(--color-primary)', textDecoration: 'none'}}>Already a partner? Login</a>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
