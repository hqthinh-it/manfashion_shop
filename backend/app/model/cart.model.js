const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema(
    {
        user_id: {
            type: mongoose.ObjectId,
        },
        product_id: {
            type: mongoose.ObjectId,
        },
        quatity: {
            type: Number,
        },
        isOrder: {
            type: Number,
            default: 0,
        },
       
    },
    {
        versionKey: false,
        timestamps: true
    }
);
module.exports = mongoose.model("Cart", cartSchema);