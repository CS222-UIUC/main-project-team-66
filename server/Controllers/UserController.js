const UserModel = require('../db/user');

// function to get or search all users
const getAllUsers = async (req, res) => {
    try {
        const keyword = req.query.search ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ]
        } : {};

        const users = await UserModel.find(keyword).find({ _id: { $ne: req.user._id } });

        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve users", error });
    }
};

module.exports = {getAllUsers}