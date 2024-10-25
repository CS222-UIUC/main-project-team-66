const express = require('express');
const router = express.Router();
const ItemModel = require('../db/item');  
const ensureAuthenticated = require('../Middleware/Auth');
const itemValidation = require('../Middleware/ItemValidation');

router.post('/create', ensureAuthenticated, itemValidation, async (req, res) => {
    try {
        const { title, description, price, category, images } = req.body;
        const seller = req.user._id;  

        const newItem = new ItemModel({
            title,
            description,
            price,
            category,
            images,  
            seller 
        });

        await newItem.save();
        console.log("Item saved");

        res.status(201).json({
            message: "Item created successfully",
            success: true,
            item: newItem
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
});

module.exports = router;
