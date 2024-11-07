import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import {ToastContainer} from 'react-toastify'
import axios from "axios";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

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

  // All of the logout functionality
  // Deletes stored token
  const handleLogout = (e)=> {
    console.log(e)
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out');
    setTimeout(()=>{
      navigate('/login');
    },1000)
  }

  const handleCreatePost = (e) => {
    console.log(e)
    navigate('/create');
  }


  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      
      <h2>Recent Items</h2>
      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Category: {item.category}</p>
              <p>Posted on: {new Date(item.createdAt).toLocaleDateString()}</p>
              <p>User ID: {item.seller}</p>
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleCreatePost}>Create Post</button>
      <ToastContainer />
    </div>
  )
}

export default Home