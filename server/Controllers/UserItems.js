const ItemModel = require('../db/item');

const getUserItems = async (req, res) => {
    try {
        // console.log("Fetching User's own published items");
        const userId = req.user.email;
        // console.log("Inside user Items")
        // console.log("user id is", userId);
        let items = await ItemModel.find({ seller: userId}, 'title description price category images seller createdAt')
            .sort({ createdAt: -1 }) 
            //.limit(5);   
        console.log("Fetched user items:", items);
              
        items = items.map(item => ({
            ...item.toObject(),
        }));

        res.status(201).json({
            message: "All items posted by the user fetched successfully",
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

module.exports = {getUserItems};
