const express = require("express");
const cors = require("cors");

const ApiError = require("./app/api-error");
var cookieParser = require('cookie-parser')

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to man fashion application."});
});

const usersRoutes = require("./app/routes/users.route");
const productsRoutes = require("./app/routes/products.route");
const cartRoutes = require("./app/routes/cart.route");



app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);

app.use("/public/uploads", express.static("public/uploads"));


// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    //      khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) =>{
    // Middleware xử lý lỗi tập trung
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    //      sẽ chuyển về middleware xử lý lỗi này
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;