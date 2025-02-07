<template>
    <AppHeader />

    <div class="container-fluid mt-5 my-5">
        <h1 class="title mb-4 text-center">GIỎ HÀNG</h1>
        <div class="row">
            <div class="carousel-inner col-md-4">
                <div class="">
                    <img src="@/assets/image/homepage/baner.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="">
                    <img src="@/assets/image/homepage/speed-1500X600.jpg" class="d-block w-100" alt="...">
                </div>
            </div>
            <div class="col-md-8">
                <table class="w-100">
                    <tbody>
                        <tr v-for="(product, key) in productInCart" class="cart-box">
                            <td>
                                <small><b class="title">{{ key + 1 }}</b></small>
                            </td>
                            <td>
                                <small><b class="title">Tên sản phẩm:</b> {{ product.productname }}</small>
                            </td>
                            <td>
                                <small><b class="title">Số lượng: </b>{{ product.quatity }}</small>
                            </td>
                            <td>
                                <small><b class="title">Giá tiền: </b>{{ (product.price * product.quatity).toLocaleString()
                                }}</small>
                            </td>
                            <td v-for="image in product.images">
                            <td><img v-if="product" :src="'http://localhost:8000/' + image.link" alt=""
                                    style="width: 100px;"></td>
                            </td>
                            <td>
                                <button @click="Order" :id="product.cart_id" :name="product.productname">Đặt</button>
                                <button @click="Cancel" :id="product.cart_id" :name="product.productname" class="mx-2 trash"><i
                                        class="fa-solid fa-trash-can"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table class="w-100 table">
                    <tbody>
                        <div v-for="(product, key) in productOrder">
                            <tr class="title" v-if="key == 0">
                                <td colspan="2"><b>
                                        Sản phẩm đã đặt:
                                    </b></td>
                            </tr>
                            <tr>
                                <td>
                                    <small><b class="title">{{ key + 1 }}</b></small>
                                </td>
                                <td>
                                    <small><b class="title">Tên sản phẩm:</b> {{ product.productname }}</small>
                                </td>
                                <td>
                                    <small><b class="title">Số lượng: </b>{{ product.quatity }}</small>
                                </td>
                                <td>
                                    <small><b class="title">Giá tiền: </b>{{ (product.price *
                                        product.quatity).toLocaleString()
                                    }}</small>
                                </td>
                                <td v-for="image in product.images">
                                    <img v-if="product" :src="'http://localhost:8000/' + image.link" alt=""
                                        style="width: 100px;">-
                                </td>
                                <td>
                                    <button v-if="product.isOrder == 1" class="buyed" disabled>Đã Đặt</button>
                                    <button v-if="product.isOrder == 2" class="complete" disabled>Xong</button>
                                </td>
                            </tr>
                        </div>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>
<script>
import AppHeader from "@/components/appheader/AppHeader.vue";
import CartService from "@/services/cart.service.js";
import authService from "@/services/auth.service.js";
import ProductService from "@/services/products.service.js";


// import ProductList from "@/components/product/ProductList.vue";
function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

export default {

    components: {
        AppHeader,
        // ProductList,
    },
    data() {
        return {
            user: null,
            cart: [],
            productInCart: [],
            order: [],
            productOrder: [],
        };
    },
    mounted() {
        var token = getCookie("token");
        if (token) {
            this.getUser();
            this.getProducts();
            this.getCart();
            this.getOrders();
        }
    },

    methods: {
        async getUser() {
            var user = await authService.get();
            this.user = user;
        },

        async getCart() {
            const cart = await CartService.getAll();
            var results = [];
            for (var product of cart) {
                if (product.user_id == this.user._id) {
                    results.push(product);
                }
            }
        },

        async getProducts() {
            const products = await ProductService.getAll();
            const cart = await CartService.getAll();
            var productInCart = [];

            for (var product of products) {
                for (var item of cart)
                    if (product._id == item.product_id && item.isOrder == 0) {
                        product.cart_id = item._id;
                        product.quatity = item.quatity;
                        productInCart.push(product);
                    }
            }
            this.productInCart = productInCart;
        },

        async getOrders() {
            const products = await ProductService.getAll();
            const orders = await CartService.getAll();
            var productOrder = [];

            for (var product of products) {
                for (var item of orders)
                    if (product._id == item.product_id && (item.isOrder == 1 || item.isOrder == 2 )) {
                        product.cart_id = item._id;
                        product.quatity = item.quatity;
                        product.isOrder = item.isOrder;
                        productOrder.push(product);
                    }
            }
            this.productOrder = productOrder;
            this.$router.push({ name: 'cart' })

        },

        async Order(e) {
            var id = $(e.target).attr('id')
            var isOrder = confirm(
                "Bạn muốn đặt " + $(e.target).attr('name') + "?"
            )
            if (isOrder) {
                var order = {
                    product_id: "",
                    customer_id: "",
                    quatity: "",
                };
                order = await CartService.getOne(id);
                await CartService.update(id, { isOrder: "1" })
                this.productOrder.push(order);
                await this.getOrders();
                window.location.reload();
            }
        },

        async Cancel(e) {
            var id = $(e.target).attr('id')
            var isCancel = confirm(
                "Bạn muốn xóa " + $(e.target).attr('name') + "?"
            )
            if (isCancel) {
                await CartService.delete(id, { isOrder: "1" })
                this.getProducts();
            }
        }

    },

};

</script>
<style scoped>
.cart-box {
    border: 1px solid #ccc !important;
    border-radius: 10px;
    width: 100% !important;
}


table {
    border-radius: 10px !important;
    border: 5px double #ccc;
}

table button {
    background-color: rgb(2, 101, 18);
    border-radius: 5px;
    border: none !important;
    color: white !important;
}

.trash{
    background-color: red;
}

.buyed {
    background-color: rgb(215, 221, 216);
}

.buyed:hover {
    background-color: rgb(215, 221, 216) !important;
}

.complete{
    background-color: red;
}
.complete:hover{
    background-color: red !important;
}
</style>