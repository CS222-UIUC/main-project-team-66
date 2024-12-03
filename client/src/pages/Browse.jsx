import React, {useEffect, useState} from 'react'
import { useLocation } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import '../styles/Browse.css'
import axios from "axios";
import HomeSidebar from './HomeSidebar';
import { Link } from 'react-router-dom';

function Browse() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [items, setItems] = useState([]);
  const location = useLocation(); 

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
    const fetchSearchItems = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = Object.fromEntries(searchParams.entries());
        console.log("Search Query: ", searchQuery);
        const response = await axios.get("http://localhost:8080/items/filteritems", {
          params: searchQuery, 
        });
        setItems(response.data.items); 
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchSearchItems();
  },[location.search]);

  return (
    <div>
    <HomeSidebar />
    <section id="product1" className='section-p1'>
      <h2>Showing Search Results</h2>
      <div className='pro-container'>


      {items.length === 0 ? (
        <p>No items match your search</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item._id} className='pro'>
              <Link to={`/product/${item._id}`}>
                <img src={item.images[0]} alt={item.title} />
                {/* <img src={ticket} alt="image" /> */}
                <div className='des'>
                    <span>{item.seller}</span>
                    <h5>{item.title}</h5>
                    <h6>{item.category}</h6>
                    <h4>${item.price}</h4>
                    <div className='cart'>
                      <a href="#"><svg className='icon' xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#000000"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg></a>
                    </div>
                </div>
              </Link>
            </div>
          ))}
        </>
      )}

      </div>
      
      <ToastContainer />
    </section>
    </div>
  )
}

export default Browse