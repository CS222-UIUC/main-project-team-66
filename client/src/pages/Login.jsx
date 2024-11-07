import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
// import illiniLogo from "client/src/assets_images/illinois_fighting_illini_logo_alternate_20141141.png";
// import illiniLogo from "@/assets_images/illinois_fighting_illini_logo_alternate_20141141.png";
// import campusImage from 'client/src/assets_images/drawing-rear-view-bachelor-campus-walking-after-college-building-continuous-line-art_7647-2800.jpg copy.png';
import illiniLogo from '../assets_images/illinois_fighting_illini_logo_alternate_20141141.png';
import campusImage from '../assets_images/drawing-rear-view-bachelor-campus-walking-after-college-building-continuous-line-art_7647-2800.jpg copy.png';
import '../styles/Login.css'


function Login() {

  const[loginInfo,setLoginInfo] = useState({
    email: '',
    password: ''
  })
  // Logic for when the user fills out the fields in the form
  const navigate = useNavigate();
  const handleChange = (e)=>{
    const {name, value} = e.target;
    console.log(name, value);
    const copyLoginInfo = {...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }
  
  // Validates user, then sends a request to server "port 8080"
  // processes the respnse and then handles any issues if they occur
  const handleLogin = async (e)=> {
    e.preventDefault();
    const {email, password} = loginInfo;
    if (!email || !password) {
      return handleError('All fields are required!')
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const {success, message, jwtToken, name, error} = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(()=> {
          navigate('/home')
        }, 1000)
      } else if(error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  }

  // Basic HTML login form - Frontend needs to fix
  return (
    // <div className='container'>
    //   <h1>Login</h1>
    //   <form onSubmit={handleLogin}>
    //     <div>
    //       <label htmlFor="email">Email</label>
    //       <input
    //           onChange={handleChange}
    //           type="email"
    //           name="email"
    //           placeholder='Enter your email'
    //           value={loginInfo.email}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <input 
    //           onChange={handleChange}
    //           type="password"
    //           name="password"
    //           placeholder='Enter your password...'
    //           value={loginInfo.password}
    //       />
    //     </div>
    //     <button type='submit'>Login</button>
    //     <span>Don't have an account?
    //         <Link to="/register">Login</Link>
    //     </span>
    //   </form>
    //   <ToastContainer />
    // </div>
    <div className="container">
      <div className="left-section">
        <h1>UIUC Marketplace</h1>
        <div className="sign-options">
          <Link to="/login" className="sign-in">
            Sign In
          </Link>
          <span className="separator"> | </span>
          <Link to="/register" className="sign-up">
            Sign Up
          </Link>
        </div>
        <div className="form-container">
          <h2>Welcome Back Illini!</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email ID</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={loginInfo.email}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={loginInfo.password}
              required
            />
            <button type="submit">Sign In</button>
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

export default Login