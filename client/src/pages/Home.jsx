import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import {ToastContainer} from 'react-toastify'

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  // All of the logout functionality
  // Deletes stored token
  const handleLogout = (e)=> {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out');
    setTimeout(()=>{
      navigate('/login');
    },1000)
  }

  const handleCreatePost = (e) => {
    navigate('/create');
  }


  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleCreatePost}>Create Post</button>
      <ToastContainer />
    </div>
  )
}

export default Home