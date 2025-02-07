const ProductService = require("../services/products.service");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    // console.log(1);
    var payload = req.body;
    payload.imgProduct = req.files;
    try {
        var product = await ProductService.create(payload);
        if (product) return res.send("Create product successfully");
    } catch (error) {
        
        return next(error);
    }
};

exports.findAll = async (req, res, next) => {
    var products;

    try {
        products = await ProductService.find({});
    } catch (error) {
        return next(new Error('An error occurred while retrieving products'));
    }

    return res.send(products);
};

exports.findOne = async (req, res, next) => {
    try {
        var document = await ProductService.findById(req.params.id); // Sử dụng đối tượng ProductService
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving contact with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const document = await ProductService.update(req.params.id, req.body); // Sử dụng đối tượng ProductService
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({ message: "Product was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating Product with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const document = await ProductService.delete(req.params.id); // Sử dụng đối tượng ProductService
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({ message: "Product was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete Product with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const deleteCount = await ProductService.deleteAll(); // Sử dụng đối tượng ProductService
        return res.send({ message: `${deleteCount} Products were deleted successfully` });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while removing all contacts"));
    }
};
