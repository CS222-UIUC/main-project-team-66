const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilepicture: {
        filename: String,        
        contentType: String,      
        imageData: Buffer
    },
    cart: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'items',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
    }]
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;