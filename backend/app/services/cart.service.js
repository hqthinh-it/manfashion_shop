const CartModel = require("../model/cart.model");

class CartService {

    async create(payload) {
        var cart = await CartModel.findOne({ product_id: payload.product_id, user_id: payload.user_id });
        if (cart) {
            cart.quatity += payload.quatity;
        } else {
            cart = new CartModel({
                user_id: payload.user_id,
                product_id: payload.product_id,
                quatity: payload.quatity,
            })
        }
        await cart.save();
        return cart;

    }

    async find() {
        try {
            var cart = CartModel.find({});
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            var cart = await CartModel.findById(id);
            return cart;
        } catch (error) {
            throw error;
        }
    }


    async update(id, payload) {
        try {
            const result = await CartModel.findByIdAndUpdate(id, payload, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await CartModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            const result = await CartModel.deleteMany({});
            return result.deletedCount;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CartService;
