import React, {useEffect, useState} from 'react'
import {ToastContainer} from 'react-toastify'


function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');

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