const UserModel = require('../db/user');


const addToCart = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log("user is");
        // console.log(req.user);
        const {productId, quantity } = req.body;
        userId = req.user._id;
        // console.log(userId);

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("user found");

        const existingItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex >= 0) {
            user.cart[existingItemIndex].quantity += quantity;
        } else {
            console.log("adding to cart");
            user.cart.push({
                productId: productId,
                quantity: quantity,
            });
        }

        await user.save();

        res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        userId = req.user._id;
        let {productId} = req.body;
        console.log("Product ID")
        productId = productId._id;
        console.log(productId);

        if (!userId || !productId) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const initialCartLength = user.cart.length;
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);

        if (initialCartLength === user.cart.length) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        await user.save();

        res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const clearCart = async (req, res) => {
    try {
        userId = req.user._id;

        if (!userId) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart = [];

        await user.save();

        res.status(200).json({ message: 'Cart cleared', cart: user.cart });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCart = async (req, res) => {
    try {
        // console.log("Request received to get cart");
        // console.log(req.user); 
        const userId = req.user._id; 

        if (!userId) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await UserModel.findById(userId).populate('cart.productId'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("User found. Returning cart.");
        
        res.status(200).json({ message: 'Cart retrieved successfully', cart: user.cart });
    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



module.exports = {addToCart, removeFromCart, clearCart, getCart};
