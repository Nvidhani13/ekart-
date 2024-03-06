import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='login'>
      <div className='login-box'>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Keep me signed in.</label>
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>

      <div className="signup-section">
          
        <p>New to eKart? <Link to='/signup'>Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login;
