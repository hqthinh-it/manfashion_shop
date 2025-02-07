const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imgProductSchema = new Schema(
    {
        product_id: {
            type: mongoose.ObjectId,
        },
        link:{
            type: String,
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);
module.exports = mongoose.model("ImageProduct", imgProductSchema);