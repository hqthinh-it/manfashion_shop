<template>
    <div class="container-fluid p-0">
        <AppHeader />

        <div class="row mt-4 mx-2" id="body-row">

            <!-- LEFT MENU -->
            <LeftMenuAdmin />
            <!-- MAIN -->
            <div class="col">

                <h1 class="title">
                    Cập nhật Sản Phẩm
                </h1>
                <hr>
                <div v-if="product" class="card table-container mt-4 p-5 backround-form">
                    <div class="update-form">
                        <ProductForm :product="product" @submit:product="updateProduct" />
                    </div>
                </div>
            </div>
        </div><!-- Main Col END -->

    </div> <!-- container -->
</template>

<script>
import LeftMenuAdmin from "@/components/appheader/LeftMenuAdmin.vue";
import ProductService from "@/services/products.service.js";
import ProductForm from "@/components/admin/forms/ProductForm.vue";
import AppHeader from "@/components/appheader/AppHeader.vue";

export default {
    components: {
        AppHeader,
        LeftMenuAdmin,
        ProductForm
    },
    data() {
        return {
            product: null,
            message: "",
        };
    },
    props: {
        id: { type: String, required: true }
    },
    methods: {
        async getProduct(id) {
            try {
                var product = await ProductService.getOne(id);
                console.log(product);
                this.product = product;

            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateProduct(data) {
            try {
                await ProductService.update(this.product._id, data);
                this.message = "Cập nhật sản phẩm thành công";
                alert(this.message  );
            } catch (error) {
                console.log(error);
            }
        },
        async deleteContact() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await ProductService.delete(this.product._id);
                    this.$router.push({ name: "contactbook" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    async created() {
        await this.getProduct(this.id);
        this.message = "";
    },
}
</script>

<style>
.backround-form {
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
    box-shadow: 1px 2px 10px rgb(2, 101, 18);
    background-image: url(@/assets/image/homepage/form.jpeg);
    background-size: cover;
}

thead {
    border-radius: 5px !important;
    color: rgb(2, 101, 18) !important;
}

.update-form{
    width: 600px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin: auto;
    padding: 50px;
    box-shadow: 1px 2px 10px rgb(2, 101, 18);
    background-color: white;
}
</style>
