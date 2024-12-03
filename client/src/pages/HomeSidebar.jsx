import '../styles/HomeSidebar.css';
import React from 'react'
import Category from './Category';
import Price from './Price';
import { Link } from 'react-router-dom';


function HomeSidebar() {
  return (
    <div>
           <section className='side'>
            <div className="logo-container">
            <Link to="/home" className="back"> <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#20457e"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>Clear Filters</Link>
            </div>
            <Category />
            <Price />

        </section>
    </div>
  )
}

export default HomeSidebar