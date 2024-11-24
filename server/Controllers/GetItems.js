const { get } = require('mongoose');
const ItemModel = require('../db/item');  

const getItems = async (req, res) => {
    try {
        let items = await ItemModel.find({}, 'title description price category images seller createdAt')
            .sort({ createdAt: -1 }) 
            .limit(8);   
              
        items = items.map(item => ({
            ...item.toObject(),
            images: item.images.map(image => {
                return `data:${image.contentType};base64,${image.imageData.toString('base64')}`;
            })
        }));

        res.status(200).json({
            message: "Most recent 8 items fetched successfully",
            success: true,
            items
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};

// function to fetch all the items from the database
const getAllItems = async (req, res) => {
    try {
        let items = await ItemModel.find({}, 'title description price category images seller createdAt')
            .sort({ createdAt: -1 });   
              
        items = items.map(item => ({
            ...item.toObject(),
            images: item.images.map(image => {
                return `data:${image.contentType};base64,${image.imageData.toString('base64')}`;
            })
        }));

        res.status(200).json({
            message: "all items successfully",
            success: true,
            items
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};

// function to fetch by search, category and price
const filterItems = async(req, res) => {
    try {
        console.log(req.query);
        const { search, category, minPrice, maxPrice } = req.query;

        let query = {}

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice); 
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        let items = await ItemModel.find(query, 'title description price category images seller createdAt')
            .sort({ createdAt: -1 }) 
            .limit(8);
            
        items = items.map(item => ({
            ...item.toObject(),
                images: item.images.map(image => {
                return `data:${image.contentType};base64,${image.imageData.toString('base64')}`;
            })
        }));
    
        res.status(200).json({
            message: "Filtered items fetched successfully",
            success: true,
            items
        });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};

module.exports = {getItems, getAllItems, filterItems};
