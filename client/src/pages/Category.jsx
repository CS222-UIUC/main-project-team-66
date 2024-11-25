import React, { useState } from 'react'
import '../styles/Category.css'

function Category() {
    const [selectedCategory, setSelectedCateogory] = useState(null)
    const [query, setQuery] = useState("")

  return (
    <div className='ml'>
        <h2 className='sidebar-title'>Category</h2>

        <div>
            <label className="sidebar-label-container">
                <input type="radio" name="test"/>
                <span className='checkmark'></span>
                All
            </label>
            <label className="sidebar-label-container">
                <input type="radio" name="test"/>
                <span className='checkmark'></span>
                Electronics
            </label>
            <label className="sidebar-label-container">
                <input type="radio" name="test"/>
                <span className='checkmark'></span>
                Clothing
            </label>
            <label className="sidebar-label-container">
                <input type="radio" name="test"/>
                <span className='checkmark'></span>
                Books
            </label>
            <label className="sidebar-label-container">
                <input type="radio" name="test"/>
                <span className='checkmark'></span>
                Home & Garden
            </label>
        </div>
    </div>
  )
}

export default Category