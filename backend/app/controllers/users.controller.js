const UserService = require("../services/users.service");
const ApiError = require("../api-error");
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    var payload = req.body;
    try {
        const usernameExists = await UserService.checkUsername(payload);
        if (usernameExists) {
            return res.send("Username already exists");
        } else {
            var user = await UserService.create(payload);
            if (user) return res.send("Register successfully");
        }
    } catch (error) {
        return next(error);
    }
};

exports.create = async (req, res, next) => {
    var payload = req.body;
    try {
        const usernameExists = await UserService.checkUsername(payload);
        if (usernameExists) {
            return res.send("Username already exists");
        } else {
            var user = await UserService.create(payload);
            console.log(user);
            if (user) return res.send("Register successfully");
        }
    } catch (error) {
        return next(error);
    }
};

exports.login = async (req, res, next) => {
    const payload = req.body;
   
    try {
        var user = await UserService.login(payload);
        if (user) {
            res.payload = user;
            return next();
        }
    } catch (error) {
        return next(new ApiError(500, `Error retrieving when logining`));
    }
};

exports.get = async (req, res, next) => {
    const payload = res.payload;
    try {
        var user = await UserService.get(payload);
        return res.send(user);
    } catch (error) {
        return next(new ApiError(404, `Account not found`));
    }
};


exports.findAll = async (req, res, next) => {
    var users;

    try {
        users = await UserService.find({});
    } catch (error) {
        return next(new Error('An error occurred while retrieving users'));
    }

    return res.send(users);
};

exports.findOne = async (req, res, next) => {
    try {
        var document = await UserService.findById(req.params.id); // Sử dụng đối tượng userService
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
        const document = await UserService.update(req.params.id, req.body); // Sử dụng đối tượng userService
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(new ApiError(500, `Error updating contact with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const document = await UserService.delete(req.params.id); // Sử dụng đối tượng userService
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete contact with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const deleteCount = await UserService.deleteAll(); // Sử dụng đối tượng userService
        return res.send({ message: `${deleteCount} contacts were deleted successfully` });
    } catch (error) {
        return next(new ApiError(500, "An error occurred while removing all contacts"));
    }
};

// exports.findAllFavorite = async (_req, res, next) => {
//     try {
//         const document = await userService.findFavorite(); // Sử dụng đối tượng userService
//         return res.send(document);
//     } catch (error) {
//         return next(new ApiError(500, "An error occurred while retrieving favorite contacts"));
//     }
// };
