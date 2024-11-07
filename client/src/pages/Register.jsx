import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

import illiniLogo from '../assets_images/illinois_fighting_illini_logo_alternate_20141141.png';
import campusImage from '../assets_images/drawing-rear-view-bachelor-campus-walking-after-college-building-continuous-line-art_7647-2800.jpg copy.png';
import '../styles/Register.css'


function Register() {

  const[registerInfo,setRegisterInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  // Logic for when the user fills out the fields in the form
  const navigate = useNavigate();
  const handleChange = (e)=>{
    const {name, value} = e.target;
    console.log(name, value);
    const copyRegisterInfo = {...registerInfo };
    copyRegisterInfo[name] = value;
    setRegisterInfo(copyRegisterInfo);
  }
  
  // Validates user, then sends a request to server "port 8080"
  // processes the respnse and then handles any issues if they occur
  const handleSignup = async (e)=> {
    e.preventDefault();
    const {name, email, password} = registerInfo;
    if (!name || !email || !password) {
      return handleError('All fields are required!')
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerInfo)
      });
      const result = await response.json();
      const {success, message, error} = result;
      if (success) {
        handleSuccess(message);
        setTimeout(()=> {
          navigate('/login')
        }, 1000)
      } else if(error) {
        const details = error?.details(0).message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  }

// Basic Registration Template - Frontend needs to fix
  return (
    <div className="container">
      <div className="left-section">
        <h1>UIUC Marketplace</h1>
        <div className="sign-options">
          <Link to="/login" className="sign-in">
            Sign In
          </Link>
          <span className="sign-up"> | </span>
          <Link to="/register" className="sign-up">
            Sign Up
          </Link>
        </div>
        <div className="form-container">
          <h2>Welcome Illini!</h2>
          <form onSubmit={handleSignup}>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={registerInfo.name}
              required
            />
            <label htmlFor="email">Email ID</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={registerInfo.email}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password..."
              value={registerInfo.password}
              required
            />
            {/* <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
            /> */}
            <button type="submit">Next</button>
          </form>
        </div>
      </div>
      <div className="right-section">
        <div className="logo">
            <img src={illiniLogo} alt="UIUC Logo" />
        </div>
        <img src={campusImage} alt="UIUC Campus" className="campus-image" />
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register