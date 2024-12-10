// const { get } = require('mongoose');
const ItemModel = require('../db/item');  

const getItems = async (req, res) => {
    try {
        let items = await ItemModel.find({}, '_id title description price category images seller createdAt')
            .sort({ createdAt: -1 }) 
            .limit(8);   
              
        items = items.map(item => ({
            ...item.toObject(),
            images: item.images.map(image => {
                return `data:${image.contentType};base64,${image.imageData.toString('base64')}`;
            }),
            id: item._id
        }));
        // console.log("Raw items fetched from the database:", items);


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
        let items = await ItemModel.find({}, '_id title description price category images seller createdAt')
            .sort({ createdAt: -1 });   
        
        items = items.map(item => ({
            ...item.toObject(),
            images: item.images.map(image => {
                return `data:${image.contentType};base64,${image.imageData.toString('base64')}`;
            }),
            id: item._id
        }));
        // console.log("Raw items fetched from the database:", items);

        items = Array.isArray(items) ? items : [];

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

        let items = await ItemModel.find(query, '_id title description price category images seller createdAt')
            .sort({ createdAt: -1 });
            
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

const getItemID = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(typeof(id));

        const item = await ItemModel.findById(id);

        const itemt = {
            ...item.toObject(),
            images: item.images.map(image => {
                return `data:${image.contentType};base64,${image.imageData.toString('base64')}`;
            })
        };

        if (!item) {
            // console.log("Not found ")
            return res.status(404).json({
                message: "Item not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Item fetched successfully",
            success: true,
            itemt
        });
    } catch (error) {
        console.error("Error fetching item by ID:", error);

        if (error.kind === "ObjectId") {
            return res.status(400).json({
                message: "Invalid item ID format",
                success: false
            });
        }

        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error
        });
    }
};

module.exports = {getItems, getAllItems, filterItems, getItemID};
