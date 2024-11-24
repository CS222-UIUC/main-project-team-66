import '../styles/HomeSidebar.css';
import React from 'react'
import Category from './Category';
import Price from './Price';


function HomeSidebar() {
  return (
    <div>
           <section className='side'>
            <div className="logo-container">
                <h1>Fake logo</h1>
            </div>
            <Category />
            <Price />

        </section>
    </div>
  )
}

export default HomeSidebar