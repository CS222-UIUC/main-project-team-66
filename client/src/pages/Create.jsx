import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import '../styles/Create.css'

function Create() {
    const navigate = useNavigate();
    const [itemInfo, setItemInfo] = useState({
        title: '',
        description: '',
        price: 0,
        category: '',
        images: []
    });

    // storing the details added to the form 
    const handleChange = (e) => {
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

    const handleHome = (e) => {
        navigate('/home');
    }

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
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer: ${localStorage.getItem('token')}`
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
        // <div className='container'>
        //     <h1>Create New Post</h1>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label htmlFor="title">Title</label>
        //             <input
        //                 type="text"
        //                 name="title"
        //                 placeholder="Enter the title"
        //                 value={itemInfo.title}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label htmlFor="description">Description</label>
        //             <textarea
        //                 name="description"
        //                 placeholder="Enter the description"
        //                 value={itemInfo.description}
        //                 onChange={handleChange}
        //                 required
        //             ></textarea>
        //         </div>
        //         <div>
        //             <label htmlFor="price">Price</label>
        //             <input
        //                 type="number"
        //                 name="price"
        //                 placeholder="Enter the price"
        //                 value={itemInfo.price}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label htmlFor="category">Category</label>
        //             <input
        //                 type="text"
        //                 name="category"
        //                 placeholder="Enter the category"
        //                 value={itemInfo.category}
        //                 onChange={handleChange}
        //                 required
        //             />
        //         </div>
        //         <div>
        //             <label htmlFor="images">Images</label>
        //             <input
        //                 type="file"
        //                 multiple
        //                 onChange={handleImageChange}
        //             />
        //         </div>
        //         <button type="submit">Create Post</button>
        //         <button onClick={handleHome}>Back to Home</button>

        //     </form>
        //     <ToastContainer />
        // </div>

        <div className="container">
            <div className="sidebar"></div>
            <div className="main-content">
                <div className="form-container">
                    <h1>Post a new Product!</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Product Name</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={itemInfo.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={itemInfo.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select category</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="books">Books</option>
                                <option value="home">Home & Garden</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={itemInfo.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={itemInfo.price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Upload product media</label>
                            <div className="upload-area">
                                <div className="upload-icon">&#x2B06;</div>
                                <p className="upload-text">
                                    Drop file here or 
                                    <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}> Upload</span>
                                </p>
                                <p className="upload-formats">(Formats JPG, PNG, JPEG)</p>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-button">Save</button>
                        <button type="button" onClick={handleHome} className="submit-button">Back to Home</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Create;
