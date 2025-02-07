<template>
    <div class="container-fluid p-0">
        <AdminHeader />

        <div class="row mt-5 mx-2" id="body-row">

            <!-- LEFT MENU -->
            <LeftMenuAdmin />
            <!-- MAIN -->
            <div class="col">

                <h1 class="title">
                    Quản lý Đơn hàng
                </h1>
                <hr>

                <div class="card table-container mt-4">
                    <table class="table caption-top">
                        <thead class="">
                            <tr>
                                <td><small><b>Tên sản phẩm</b></small></td>
                                <td><small><b>Màu sắc</b></small></td>
                                <td><small><b>Size</b></small></td>
                                <td><small><b>Giá</b></small></td>
                                <td><small><b>Số lượng kho</b></small></td>
                                <td><small><b>Tài khoản đặt</b></small></td>
                                <td><small><b>Số lượng đặt</b></small></td>
                                <td><small><b>Hình ảnh</b></small></td>
                                <td><small><b>Action</b></small></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(order, index) in productOrder">
                                <td>{{ order.productname }}</td>

                                <td>{{ order.color }}</td>

                                <td v-if="order.size == 1">M</td>
                                <td v-if="order.size == 2">L</td>
                                <td v-if="order.size == 3">XL</td>

                                <td>{{ order.price }}</td>
                                <td>{{ order.amount }}</td>
                                <td>{{ order.username }}</td>
                                <td>{{ order.quatity }}</td>

                                <td>
                                    <img :src="'http://localhost:8000/' + order.images[0].link" alt="" style="width:100px;">
                                </td>
                                <td>
                                    <button v-if="order.isOrder == 1" @click="Complete" :id="order.cart_id"
                                        :name="order.productname" class="btn"> <i class="fa-solid fa-check"></i></button>
                                    <button v-else @click="Complete" :id="order.cart_id" :name="order.productname"
                                        class="btn complete" disabled> <i class="fa-solid fa-check"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div><!-- Main Col END -->
        </div>
    </div> <!-- container -->
</template>

<script>
import LeftMenuAdmin from "@/components/appheader/LeftMenuAdmin.vue";
import AdminHeader from "@/components/appheader/AdminHeader.vue";
import CartService from "@/services/cart.service.js";
import authService from "@/services/auth.service.js";
import ProductService from "@/services/products.service.js";


export default {

    components: {
        AdminHeader,
        LeftMenuAdmin
        // ProductList,
    },
    data() {
        return {
            user: null,
            cart: [],
            productInCart: [],
            order: [],
            productOrder: [],
            index: -1,
        };
    },
    mounted() {
        this.getCart();
        this.getOrders();
    },

    methods: {

        async getCart() {
            const cart = await CartService.getAll();
            this.cart = cart;
        },

        async getOrders() {
            const products = await ProductService.getAll();
            const orders = await CartService.getAll();
            const users = await authService.getAll();

            var productOrder = [];
            for (var product of orders) {
                for (var item of users)
                    if (product.user_id == item._id) {
                        product.username = item.username;
                    }
            }

            for (var product of products) {
                for (var item of orders)
                    if (product._id == item.product_id && item.isOrder != 0) {
                        product.cart_id = item._id;
                        product.quatity = item.quatity;
                        product.username = item.username;
                        product.isOrder = item.isOrder;
                        productOrder.push(product);
                    }
            }

            this.productOrder = productOrder;
        },

        async Complete(e) {
            var id = $(e.target).attr('id')
            var isComplete = confirm(
                "Xác nhận đơn " + $(e.target).attr('name') + "?"
            )
            if (isComplete) {
                var order = await CartService.getOne(id);
                if (order) {
                    const oldAmount = await ProductService.getOne(order.product_id);
                    const updatedAmount = oldAmount.amount - order.quatity;
                    await ProductService.update(order.product_id, { amount: updatedAmount });
                    await CartService.update(id, { isOrder: "2" })
                    this.productOrder.push(order);
                    await this.getOrders();
                    window.location.reload();
                }

            }
        },

    },

};
</script>

<style>
td>.btn {
    border-radius: 30px;
}

.complete {
    background-color: rgba(246, 246, 89, 0.792)
}
</style>