const OrderModel = require("../model/order.model");

class OrderService {

    async create(payload) {
        var order = new OrderModel({
            product_id: payload.staff_id,
            customer_id: payload.customer_id,
            quatity: payload.quatity,
        })
        await order.save();
        return order;

    }

    async find() {
        try {
            var order = OrderModel.find({});
            return order;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            var order = await OrderModel.findById(id).exec();
            return order;
        } catch (error) {
            throw error;
        }
    }


    async update(id, payload) {
        try {
            const result = await OrderModel.findByIdAndUpdate(id, payload, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await OrderModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            const result = await OrderModel.deleteMany({});
            return result.deletedCount;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new OrderService;
