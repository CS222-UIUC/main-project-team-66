import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'


function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <ToastContainer />
    </div>
  )
}

export default Home