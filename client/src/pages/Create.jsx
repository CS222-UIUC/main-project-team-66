import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../utils';
import '../styles/Create.css'

function Create() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [itemInfo, setItemInfo] = useState({
        title: '',
        description: '',
        price: 0,
        category: '',
        images: [], 
        imagePreviews: [] 
    });

    // storing the details added to the form 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemInfo({ ...itemInfo, [name]: value });
        console.log(name, value)
    };

    // handling the images input
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); 
        setItemInfo({ ...itemInfo, images: files });
        console.log(files);

        const previews = files.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });
        
        Promise.all(previews).then((imagePreviews) => {
            setItemInfo((prevInfo) => ({ ...prevInfo, imagePreviews }));
        }).catch((error) => console.error("Error loading previews:", error));
    };


    // validating the input and saving
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handle submit')

        const { title, description, price, category, images } = itemInfo;
        //console.log(images);
        if (!title || !description || !price || !category) {
            return handleError('All fields except images are required!');
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        images.forEach((image) => formData.append("images", image));

        try {
            const url = "http://localhost:8080/items/create";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                  'Authorization': `Bearer: ${localStorage.getItem('token')}`
                },
                body: formData
              });

            const result = await response.json();
            const {success, message, error} = result;

            if (success) {
                navigate('/home');
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
                            <div className="upload-area" onClick={() => fileInputRef.current.click()}>
                                <div className="upload-icon">&#x2B06;</div>
                                <p className="upload-text">
                                    Drop file here or 
                                    <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}> Upload</span>
                                </p>
                                <p className="upload-formats">(Formats JPG, PNG, JPEG)</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    multiple
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                            
                            {/* Display image previews */}
                            <div className="image-previews">
                                {itemInfo.imagePreviews && itemInfo.imagePreviews.map((preview, index) => (
                                    <img
                                        key={index}
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        className="preview-image"
                                    />
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                        {/* <button type="button" onClick={handleHome} className="submit-button">Back to Home</button> */}
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Create;