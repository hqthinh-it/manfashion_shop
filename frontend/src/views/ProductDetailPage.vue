<template>
    <AppHeader />
    <div class="container-fluid pt-5" v-if="product">
        <ProductDetail :product="product" />
    </div>
</template>
<script>
import AppHeader from "@/components/appheader/AppHeader.vue";
import ProductService from "@/services/products.service.js";
import ProductDetail from "@/components/product/ProductDetail.vue";

export default {
    components: {
        AppHeader,
        ProductDetail,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            key: 0,
            product: [],
        };
    },


    methods: {
        async getProduct() {
            const productId = await this.$route.params.id;
            var product = await ProductService.getOne(productId);
            this.product = product;
        },

    },
    async mounted() {
        await this.getProduct();
    },
};

</script>
<style scoped></style>
