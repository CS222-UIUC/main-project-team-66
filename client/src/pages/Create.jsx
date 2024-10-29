import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import axios from 'axios';

function Create() {
    // const navigate = useNavigate();
    const [itemInfo, setItemInfo] = useState({
        title: '',
        description: '',
        price: 0,
        category: '',
        images: [],
    });

    // storing the details added to the form 
    const handleChange = (e) => {
        console.log("handle change")
        const { name, value } = e.target;
        setItemInfo({ ...itemInfo, [name]: value });
        console.log(name, value)
    };

    // handling the images input
    const handleImageChange = (e) => {
        console.log('handle image change')
        setItemInfo({ ...itemInfo, images: Array.from(e.target.files) });
        console.log(e.target.files)
    };

    // validating the input and saving
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handle submit')

        const { title, description, price, category, images } = itemInfo;
        if (!title || !description || !price || !category) {
            return handleError('All fields except images are required!');
        }

        try {
            const url = "http://localhost:8080/items/create";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemInfo)
              });

            const result = await response.json();
            const {success, message, error} = result;

            if (success) {
                handleSuccess(message);
            } else if (error) {
                // const details = error?.details(0).message;
                //handleError(details);
                console.log(error.message)
            } else {
                handleError(message || 'Failed to create post. Please try again.');
               
            }

        } catch (error) {
            handleError(error.message);
        }
    };

    return (
        <div className='container'>
            <h1>Create New Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter the title"
                        value={itemInfo.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter the description"
                        value={itemInfo.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Enter the price"
                        value={itemInfo.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        name="category"
                        placeholder="Enter the category"
                        value={itemInfo.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="images">Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit">Create Post</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Create;
