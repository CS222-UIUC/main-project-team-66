import React, {createContext, useState, useContext, useEffect} from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, quantity) => {
        const existingItemIndex = cart.findIndex(item => item.productId === product._id);

        if (existingItemIndex >= 0) {
            const newCart = [...cart];
            newCart[existingItemIndex].quantity += quantity;
            setCart(newCart);
        } else {
            setCart([...cart, {productId: product._id, product, quantity}]);
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.productId !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
}

