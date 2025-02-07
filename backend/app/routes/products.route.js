const express = require("express");
const products = require("../controllers/products.controller");

const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, './public/uploads/');
  },
  filename: function (req, file, cd) {
    cd(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.route("/")
    .get(products.findAll)
    .post(upload.array('imgProduct', 6) ,products.create)
    .delete(products.deleteAll);

router.route("/:id")
    .get(products.findOne)
    .put(products.update)
    .delete(products.delete);

module.exports = router;