const express = require("express");
const users = require("../controllers/users.controller");
const middlewares = require("../middlewares");

const router = express.Router();

router.route("/")
    .post(users.create)
    .get(middlewares.verifyToken, users.get)
    .delete(users.deleteAll);
    
router.route("/all")
    .get(users.findAll)

router.route("/register")
    .post(users.register);

router.route("/login")
    .post(users.login, middlewares.createToken);

router.route("/logout")
    .post(middlewares.clearToken)

router.route("/check")
    .post(middlewares.verifyToken, middlewares.verifyRole);

router.route("/:id")
    .get(users.findOne)
    .put(users.update)
    .delete(users.delete);


module.exports = router;