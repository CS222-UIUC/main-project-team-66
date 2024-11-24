const ItemModel = require('../db/item');  

const getItems = async (req, res) => {
    try {
        // console.log("Fetching the most recent 5 items from database");
        let items = await ItemModel.find({}, 'title description price category images seller createdAt')
            .sort({ createdAt: -1 }) 
            .limit(8);   

        // console.log("Fetched items:", items);
              
        items = items.map(item => ({
            ...item.toObject(),
            images: item.images.map(image => {
                return `data:${image.contentType};base64,${image.imageData.toString('base64')}`;
            })
        }));

        res.status(200).json({
            message: "Most recent 5 items fetched successfully",
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

module.exports = {getItems};
