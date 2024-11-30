import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProductDetail.css';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ticket from '../assets_images/ticket.jpeg'
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
    //   try {
    //     const response = await axios.get(`http://localhost:8080/items/getitem/${id}`);
    //     setProduct(response.data);
    //   } catch (error) {
    //     console.error('Could not fetch product', error);
    //   }

        // Get rid of this dummy data once the backend is implemented. Also get rid of the comment once that is done.
        const dummyProduct = {
            _id: id,
            title: 'Ticket',
            description: 'This is a sample description. This is a sample description. This is a sample description. This is a sample description. This is a sample description.',
            price: 10,
            seller: 'Khushi',
            category: 'Sports',
            images: [ticket],
        };

      setProduct(dummyProduct);
    };

    const fetchRelatedProducts = async () => {
        try {
          //console.log("Inside fetch items");
          const response = await axios.get('http://localhost:8080/items/getitems'); 
          setRelatedProducts(response.data.items.slice(0,4)); 
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };

    fetchProductDetails();
    fetchRelatedProducts();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    navigate('/cart');
  };

  return (
    <div className="product-detail-container">
      <Link to="/home" className="back-to-home"> <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>Back to Home</Link>
      <div className="product-detail">
        <div className="product-image">
          <img src={product.images[0]} alt={product.title} />
        </div>
        <div className="product-info">
          <h2>{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <h4>Price: ${product.price}</h4>
          <p>Seller: {product.seller}</p>
          <p>Category: {product.category}</p>
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      </div>
    
      <section id='product' className="related-products">
        <h2>You May Also Like</h2>
        <div className="pro-container-related">
          {relatedProducts.length === 0 ? (
            <p>No related products available</p>
          ) : (
            relatedProducts.map((item) => (
              <div key={item._id} className="prod">
                <Link to={`/product/${item._id}`}>
                  <img src={item.images[0]} alt={item.title} />
                  <div className="desc">
                    <span>{item.seller}</span>
                    <h5>{item.title}</h5>
                    <h6>{item.category}</h6>
                    <h4>${item.price}</h4>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </div>

  );
}

export default ProductDetail;