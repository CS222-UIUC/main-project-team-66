/* eslint-disable no-undef */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative'],
    },
    category: {
        type: String,
        required: true
    },
    images: [{
        filename: String,        
        contentType: String,      
        imageData: Buffer        
    }],
    seller: {
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'User',
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ItemModel = mongoose.model('items', ItemSchema);
module.exports = ItemModel;
