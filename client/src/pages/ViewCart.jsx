import React from 'react'
import '../styles/ViewCart.css';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

function ViewCart() {

    const {cart, removeFromCart, clearCart } = useCart();
    const total = cart.reduce((total, item) => total + item.quantity * item.product.price, 0);
  
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