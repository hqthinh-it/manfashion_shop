<template>
    <div class="container-fluid p-0">
        <AdminHeader />

        <div class="row mt-4 mx-2" id="body-row">

            <!-- LEFT MENU -->
            <LeftMenuAdmin />
            <!-- MAIN -->
            <div class="col">

                <h1 class="title">
                    Thêm Sản phẩm
                </h1>
                <hr>
                <div v-if="product" class="card table-container mt-4 p-5 backround-form">
                    <div class="update-form">
                        <ProductForm :product="product" @submit:product="addProduct" />
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
import AdminHeader from "@/components/appheader/AdminHeader.vue";


export default {
    components: {
        AdminHeader,
        LeftMenuAdmin,
        ProductForm
    },
    data() {
        return {
            product: {
                "category_id": "",
                "productname": "",
                "color": "",
                "size": "",
                "price": "",
                "amount": "",
                "image": "",
                "decribe": ""
            },
            message: "",
        };
    },
    // props: {
    //     id: { type: String, required: true }
    // },
    methods: {
        async addProduct(data) {
            var formdata = new FormData();

            for (const [key, value] of Object.entries(data)) {
                formdata.append(key, value);
            }

            for (const image of data.images) {
                formdata.append('imgProduct', image, image.name);
            }

            await ProductService.create(formdata);
            this.message = "Thêm sản phẩm thành công";
            alert(this.message);
            

        },


        async deleteContact() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await ProductService.delete(this.product._id);
                    this.$router.push({ name: "dashboard" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    // async created() {
    //     await this.getUser(this.id);
    //     this.message = "";
    // },
}
</script>

<style>
.backround-form {
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
    box-shadow: 1px 2px 10px rgb(2, 101, 18);
    background-image: url(@/assets/image/homepage/baner.jpg);
    background-size: cover;
}

thead {
    border-radius: 5px !important;
    color: rgb(2, 101, 18) !important;
}

.update-form {
    width: 600px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin: auto;
    padding: 50px;
    box-shadow: 1px 2px 10px rgb(2, 101, 18);
    background-color: white;
}
</style>
