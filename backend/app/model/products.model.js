const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema(
    {
        category_id: {
            type: Number,
        },
        productname: {
            type: String,
        },
        color: {
            type: String,
        },
        size: {
            type: String,
        },
        price: {
            type: Number,
        },
        amount: {
            type: Number,
        },
        decribe: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
);
module.exports = mongoose.model("Product", productSchema);