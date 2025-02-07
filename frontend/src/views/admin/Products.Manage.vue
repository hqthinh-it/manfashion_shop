<template>
    <div class="container-fluid p-0">
        <AdminHeader />

        <div class="row mt-5 mx-2" id="body-row">

            <!-- LEFT MENU -->
            <LeftMenuAdmin />
            <!-- MAIN -->
            <div class="col">
                <div class="row">
                    <h1 class="title mx-3">
                        Quản lý Sản phẩm
                    </h1>
                    <div class="add-user mx-3 mt-2">
                        <button type="button" @click="goToAddProducts" class="btn rounded-circle" name="btn-update"><i
                                class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <hr>
                <div class="card table-container mt-4">
                    <table class="table caption-top">
                        <thead class="">
                            <tr>
                                <td><small><b>Danh mục</b></small></td>
                                <td><small><b>Tên sản phẩm</b></small></td>
                                <td><small><b>Màu sắc</b></small></td>
                                <td><small><b>Size</b></small></td>
                                <td><small><b>Giá</b></small></td>
                                <td><small><b>Số lượng</b></small></td>
                                <td><small><b>Mô tả</b></small></td>
                                <td><small><b>Hình ảnh</b></small></td>
                                <td><small><b>Action</b></small></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in products" :key="product._id"
                                :class="{ active: index === activeIndex }">
                                <td v-if="product.category_id == 1">Bộ Sưu Tập</td>
                                <td v-if="product.category_id == 2">Áo Thun</td>
                                <td v-if="product.category_id == 3">Áo Sơ Mi</td>
                                <td v-if="product.category_id == 4">Áo Khoác</td>

                                <td>{{ product.productname }}</td>
                                <td>{{ product.color }}</td>

                                <td v-if="product.size == 1">M</td>
                                <td v-if="product.size == 2">L</td>
                                <td v-if="product.size == 3">XL</td>

                                <td>{{ product.price }}</td>
                                <td>{{ product.amount }}</td>
                                <td>{{ product.decribe }}</td>
                                <td>
                                    <img :src="'http://localhost:8000/' + product.images[0].link" alt="" style="width:100px;">
                                </td>
                                <td>
                                    <router-link :to="{
                                        name: 'product.edit',
                                        params: { id: product._id },
                                    }"><button type="button" class="btn rounded-circle" name="btn-update"> <i
                                                class="fa-solid fa-pen"></i></button>
                                    </router-link>
                                    <a href=""> <button type="button" class="btn rounded-circle mx-1"
                                            @click="deleteProducts" name="btn-detele" :id="product._id">
                                            <i class="fa-solid fa-trash-can"></i></button> </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div><!-- Main Col END -->

    </div> <!-- container -->
</template>

<script>
import LeftMenuAdmin from "@/components/appheader/LeftMenuAdmin.vue";
import ProductService from "@/services/products.service.js";
import AdminHeader from "@/components/appheader/AdminHeader.vue";


export default {
    components: {
        AdminHeader,
        LeftMenuAdmin,
    },
    data() {
        return {
            products: [],
            activeIndex: -1,
            searchText: "",
        };
    },

    methods: {
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveProducts();
            this.activeIndex = -1;
        },

        goToAddProducts() {
            this.$router.push({ name: "product.add" });
        },
        async deleteProducts(e) {
            var id = $(e.currentTarget).attr("id");
            if (confirm("Bạn muốn xóa Sản phẩm này?")) {
                await ProductService.delete(id);
            }
        },

    },
    mounted() {
        this.refreshList();
    },
}
</script>