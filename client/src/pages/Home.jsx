import React, {useEffect, useState} from 'react'
import {ToastContainer} from 'react-toastify'
import axios from "axios";


function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
    const fetchItems = async () => {
      try {
        console.log("Inside fetch items");
        const response = await axios.get('http://localhost:8080/items/getitems'); 
        setItems(response.data.items); 
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  },[])

  return (
    <div>
      <h1>Welcome! {loggedInUser}</h1>
      <ToastContainer />
    </div>
  )
}

export default Home