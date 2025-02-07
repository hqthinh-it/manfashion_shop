const ProductModel = require("../model/products.model");
const imgProducts = require("../model/imgProducts.model");


class ProductService {

    async create(payload) {

        var product = new ProductModel({
            category_id: payload.category_id,
            productname: payload.productname,
            color: payload.color,
            size: payload.size,
            price: payload.price,
            amount: payload.amount,
            decribe: payload.decribe,
        })

        var images = payload.imgProduct;
        for (const image of images) {
            var imgProduct = new imgProducts({
                product_id: product._id,
                link: image.path,
            })
            await imgProduct.save();
        }

        await product.save();
        return product;
    }


    async find() {
        var products = await ProductModel.find();
        
        var arrayProduct=[];
        for (var product of products) {
            var images = await imgProducts.find({
                product_id:product._id
            });
            product = {
                ...product._doc,
                images: images
            }
            arrayProduct.push(product);
        }

        return arrayProduct;
    }

    async findById(id) {
        try {
            var product = await ProductModel.findById(id);
            var images = await imgProducts.find({ product_id: product._id });
            product = {
                ...product._doc,
                images: images
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async findImageProductById(id) {
        try {
            var images = await imgProducts.findById(id).exec();
            return images;
        } catch (error) {
            throw error;
        }
    }

    // async findByName(name) {
    //     try {
    //         return await this.User.find({
    //             name: { $regex: new RegExp(name, "i") },
    //         });
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async findFavorite() {
    //     try {
    //         return await this.User.find({ favorite: true });
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async update(id, payload) {
        try {
            const result = await ProductModel.findByIdAndUpdate(id, payload, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await ProductModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            const result = await ProductModel.deleteMany({});
            return result.deletedCount;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductService;
