const ItemModel = require('../db/item');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const isValidType = allowedTypes.test(file.mimetype);
        if (isValidType) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, and GIF images are allowed.'));
        }
    }
}).array('images', 5); 

const createItem = (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            console.error("Multer error:", err);
            return res.status(400).json({
                message: err.message || 'Error uploading images',
                success: false
            });
        }
        // console.log("Request Body:", req.body);
        // console.log("Request Files:", req.files);

        try {
            const { title, description, price, category } = req.body;
            const seller = req.user.email; 

            if (!title || !description || !price || !category) {
                return res.status(400).json({
                    message: 'All fields except images are required!',
                    success: false
                });
            }

            const images = req.files.map(file => ({
                filename: file.originalname,
                contentType: file.mimetype,
                imageData: file.buffer
            }));

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
};

module.exports = { createItem }
