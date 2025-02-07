const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username can't be empty"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password can't be empty"],
        },
        fullname: {
            type: String,
            required: [true, "Fullname can't be empty"],
        },
        gender: {
            type: String,
            required: [true, "Gender can't be empty"],
        },
        email: {
            type: String,
            required: [true, "Email can't be empty"],
        },
        address: {
            type: String,
            required: [true, "Adress can't be empty"],
        },
        phone: {
            type: String,
            required: [true,"Phone can't be empty"],
        },
        role: {
            type: String,
            enum: ['customer', 'admin'],
            default: 'customer',
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
);
module.exports = mongoose.model("User", userSchema);