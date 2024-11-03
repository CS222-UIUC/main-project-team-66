import React from 'react'
import { useAuth } from '../AuthContext';

function Navbar() {

  const { user, logout } = useAuth();

  const showSideBar = (event) => {
    event.preventDefault();
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex'
  }

  const hideSideBar = (event) => {
    event.preventDefault();
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none'
  }
  return (
    <nav className='nav'>
        <ul className='sidebar' style={{ display: 'none' }}>
          <li className='icon' aria-label="icon" onClick={hideSideBar}><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></li>
          <li><a href="#">Browse</a></li>
          <li><a href="#">Cart</a></li>
          <li><a href="#">Seller</a></li>
        </ul>
        <ul>
          <li><a href="#">UIUC MarketPlace</a></li>
          <li className='hideOnMobile'><a href="#">Browse</a></li>
          <li className='hideOnMobile'><a href="#">Cart</a></li>
          <li className='hideOnMobile'><a href="#">Seller</a></li>
          <li className='menu-button' aria-label="menu-button" onClick={showSideBar}><a href=""><svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#000000"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li>
          {user && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
        </ul>
    </nav>
  )
}

export default Navbar