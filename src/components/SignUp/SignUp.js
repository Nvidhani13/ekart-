import React, { useState } from 'react';
import './signup.css';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = () => {
    // Add logic to send OTP to the user's email
    // For example, you can make an API call to send an OTP

    // For demonstration purposes, let's set otpSent to true
    setOtpSent(true);
  };

  const handleRegister = () => {
    // Add logic to register the user with the provided data
    // For example, you can make an API call to register the user

    // For demonstration purposes, let's set registered to true
    setRegistered(true);
  };

  return (
    <div className='signup'>
      <div className='signup-box'>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" name="username" onChange={handleChange} value={formData.username} placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={formData.email} placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={formData.password} placeholder="Enter password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} placeholder="Confirm password" />
          </div>

          {!otpSent ? (
            <button type="button" className="btn btn-primary" onClick={handleSendOtp}>Send OTP</button>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="otp">Enter OTP</label>
                <input type="text" className="form-control" id="otp" name="otp" onChange={handleChange} value={formData.otp} placeholder="Enter OTP" />
                <small className="form-text text-muted">OTP was sent to your email.</small>
              </div>
              <button type="button" className={`btn btn-primary ${formData.otp.length === 4 ? '' : 'disabled'}`} onClick={handleRegister}>Register</button>
            </>
          )}
        </form>
        
      </div>
      <div className="signup-section">
        <p>New to eKart? <a href="#" className="signup-link">Login</a></p>
      </div>
      {registered && <p>User successfully registered!</p>}
    </div>
  );
}

export default SignUp;
