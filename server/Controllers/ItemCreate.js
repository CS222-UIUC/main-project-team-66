const ItemModel = require('../db/item');  

const createItem = async (req,res) => {
    try {
        console.log("inside Create Item");
        const { title, description, price, category, images } = req.body; 
        console.log("The user is ")
        console.log(req.user)
        console.log("after")
        const seller = req.user.name;  

        const newItem = new ItemModel({
            title,
            description,
            price,
            category,
            images,  
            seller 
        });

        // saving the item into the database 
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

}

module.exports = {createItem}