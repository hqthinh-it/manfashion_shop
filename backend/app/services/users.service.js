const UserModel = require("../model/users.model");
const bcrypt = require("bcryptjs");

class UserService {
    async checkUsername(payload) {
        const existingRecord = await UserModel.findOne({ username: payload.username });
        return !!existingRecord;
    }

    async login(payload) {
        var user = await UserModel.findOne({
            username: payload.username,
        });
        // const validPassword = bcrypt.compareSync(payload.password, user.password);
        if (payload.password === user.password) {
            return user;
        } else {
            return next(new ApiError(404, `Password was wrong`));
        }
    }

    async create(payload) {
        try {
            // Hash password
            // const salt = bcrypt.genSaltSync(10);
            // const hashPass = bcrypt.hashSync(payload.password, salt);

            var user = new UserModel({
                username: payload.username,
                password: payload.password,
                fullname: payload.fullname,
                gender: payload.gender,
                email: payload.email,
                address: payload.address,
                phone: payload.phone,
            })
            await user.save();
            console.log(user);
            return user;
        } catch (err) {
            throw error;
        }
    }

    async find() {
        try {
            var users = UserModel.find({});
            return users;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            var user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async get(payload) {
        var user = await UserModel.findById(payload.id);
        return user;
    }

    async update(id, payload) {
        try {
            const result = await UserModel.findByIdAndUpdate(id, payload, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await UserModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            const result = await UserModel.deleteMany({});
            return result.deletedCount;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService;
