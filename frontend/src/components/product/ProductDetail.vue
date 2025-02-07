<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <img v-if="product.images" :src="'http://localhost:8000/' + product.images[0].link" alt=""
                            style="width: 100%;">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body decribe">
                        <div class="row">
                            <h4 class="card-title title col-md-8">{{ product.productname }}</h4>
                            <div class="col-md-4 detail-button row">
                                <select name="quatity" id="quatity" class="" v-model="cart.quatity">
                                    <option class="text-center" value="" disabled> ?
                                    </option>
                                    <option v-for="index in product.amount" :value="index">{{ index }}
                                    </option>
                                </select>
                                <button class="mx-1"><i class="fa-solid fa-cart-plus"
                                        @click="addProductToCart()"></i></button>
                            </div>
                        </div>
                        <p class="d-label"><i class="fa-solid fa-palette"></i> <b> Màu sắc:</b> {{ product.color }}</p>
                        <p class="d-label"><i class="fa-solid fa-sack-dollar"></i><b> Giá sản phẩm:</b> {{ product.price }}
                        </p>
                        <p class="d-label" v-if="product.size == 1"><i class="fa-solid fa-shirt"></i><b> Kích thước:</b> M
                        </p>
                        <p class="d-label" v-if="product.size == 2"><i class="fa-solid fa-shirt"></i><b> Kích thước:</b> L
                        </p>
                        <p class="d-label" v-if="product.size == 3"><i class="fa-solid fa-shirt"></i><b> Kích thước:</b> XL
                        </p>
                        <p class="d-label"><i class="fa-solid fa-tag"></i><b> Số lượng còn lại:</b> {{ product.amount }}</p>
                        <p class="d-label">{{ product.decribe }}</p>
                    </div>
                    <div class="row img-box">
                        <div class="card-body col-md-6">
                            <img v-if="product.images" :src="'http://localhost:8000/' + product.images[1].link" alt=""
                                style="width: 100%;">
                        </div>
                        <div class="card-body col-md-6">
                            <img v-if="product.images" :src="'http://localhost:8000/' + product.images[2].link" alt=""
                                style="width: 100%;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import authService from "@/services/auth.service";
import CartService from "@/services/cart.service.js";

function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}
export default {
    props: {
        product: { type: Object, required: true },
    },
    data() {
        return {
            user: null,
            cart: {
                quatity: ""
            }

        }
    },
    emits: ["submit:product"],
    methods: {
        async addProductToCart() {
            this.cart.user_id = this.user._id;
            this.cart.product_id = this.product._id;
            await CartService.create(this.cart);

            this.message = "Thêm sản phẩm thành công";
            alert(this.message);
        },

        async getUser() {
            var user = await authService.get();
            this.user = user;
        },

    },
    mounted() {
        var token = getCookie("token");
        if (token) {
            this.getUser();
        }
    }
};
</script>

<style scoped>
.decribe {
    height: 300px;
}

.detail-button button {
    background-color: white;
    width: 50px;
    border-radius: 5px;
}

#quatity {
    border: 2px solid rgb(12, 111, 29) !important;
    border-radius: 5px;
}

.d-label {
    color: rgb(107, 131, 111);
    font-size: 300;
}
</style>
