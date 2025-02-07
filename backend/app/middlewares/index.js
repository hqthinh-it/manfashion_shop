const UserService = require("../services/users.service");
const ApiError = require("../api-error");
const jwt = require('jsonwebtoken');
const config = require("../config");
const UserModel = require("../model/users.model");


module.exports = {
    createToken: async (req, res, next) => {
        var payload = res.payload;
        const token = jwt.sign({
            id: payload._id
        },
            config.key
        );
        res.cookie("token", token, { expires: new Date(Date.now() + 24 * 3600000) });
        if (token) {
            return res.json({
                token: token
            });
        } else {
            return next(new ApiError(401, 'Token is not exist'));
        }
    },


    verifyToken: async (req, res, next) => {
        var token = req.cookies.token
        var data = jwt.verify(token, config.key);
        if (data) {
            var payload = req.body;
            payload.id = data.id;
            res.payload = payload;
            return next();
        } else {
            return next(new ApiError(401, 'Token is not exist'))
        }

    },

    verifyRole: async (req, res, next) => {
        var id = res.payload.id;
        var user = await UserModel.findById(id);
        if (user.role == "admin") {
            return res.send(user);
        } else {
            return res.send(null);
        }
    },

    clearToken: async (req, res, next) => {
        res.clearCookie("token");
        return res.send("Token is deleted");
    }
}