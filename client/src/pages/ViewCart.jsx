import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ViewCart.css';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ViewCart() {

    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    // const {cart, removeFromCart, clearCart } = useCart();
    // const total = cart.reduce((total, item) => total + item.quantity * item.product.price, 0);

    const fetchProductDetails = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:8080/items/itemid/${productId}`);
            return response.data.itemt; 
        } catch (error) {
            console.error('Could not fetch product details:', error);
            return null; 
        }
    };

    const fetchCart = async () => {
        console.log("fetching cart");
        try {
            const response = await axios.get('http://localhost:8080/users/getcart', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
            });
            const cartData = response.data.cart;
            console.log(cartData);
            const enrichedCart = await Promise.all(
                cartData.map(async (item) => {
                    // console.log(typeof(item.productId));
                    // console.log(item.productId._id);
                    const product = await fetchProductDetails(item.productId._id);
                    return { ...item, product }; 
                })
            );

            setCart(enrichedCart);
            // setCart(response.data.cart); 
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            console.log("removing from cart", productId);
            const response = await axios.post(
                'http://localhost:8080/users/removeitemfromcart',
                { productId },
                {
                    headers: {'Authorization': `Bearer: ${localStorage.getItem('token')}`},
                }
            );
            setCart(response.data.cart); 
            navigate('/cart');
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const clearCart = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8080/users/clearcart',
                {},
                {
                    headers: { 'Authorization': `Bearer: ${localStorage.getItem('token')}` },
                }
            );
            setCart([]); 
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    useEffect(() => {
        fetchCart(); // Fetch the cart on component mount
    }, []);

    const total = cart.reduce((total, item) => total + item.quantity * item.productId.price, 0);
  
    return (
        <div className='cart-container'>
            <Link to="/home" className="back-to-home"> <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>Back to Home</Link>
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
            <p className='empty'>Your cart is empty...</p>
            ) : (
            <div className='cart-content'>
                <div className='cart-items'>
                {cart.map((item) => (
                    <div key={item.productId} className='cart-item'>
                        <div className='cart-item-info'>
                            
                            <img className='cart-item-image' src={item.product.images[0]} alt={item.title} />
                            <div className='cart-item-details'>
                                <h4>{item.product.title}</h4>
                                <p className='price'>${item.product.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p className='seller'>{item.product.seller}</p>
                            
                            </div>
                            <button className='remove-btn' onClick={() => removeFromCart(item.productId)}>Remove</button>
                        </div>
                        
                    </div>
                ))}
                </div>
                <div className='cart-summary'>
                    <h3>Total: ${total.toFixed(2)}</h3>
                    <button className='clear-btn' onClick={clearCart}>Clear Cart</button>
                    <Link to="#">
                            <button className="checkout-btn">Proceed to Checkout</button>
                    </Link>
                </div>

            </div>
            )}
      </div>
    )
}

export default ViewCart