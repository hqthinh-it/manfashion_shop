<template>
    <AppHeader :key="getKey" @submit:user="reloadHeader" />
    <div id="carouselExampleIndicators" class="carousel slide mt-5 mx-5">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="@/assets/image/homepage/banner_02.jpg" class="d-block w-100" alt="...">

            </div>
        </div>
    </div>
    <div class="container-fluid pt-5 my-5">
        <h1 class="title mb-4 text-center">ÁO THUN</h1>
        <ProductList :products="products" />
    </div>
</template>
<script>
import AppHeader from "@/components/appheader/AppHeader.vue";

import ProductService from "@/services/products.service.js";
import ProductList from "@/components/product/ProductList.vue";

export default {
    components: {
        AppHeader,
        ProductList,
    },
    data() {
        return {
            key: 0,
            products: [],
        };
    },

    computed: {
        getKey() {
            return this.key;
        }
    },

    methods: {
        async getProducts() {
            const products = await ProductService.getAll();
            var results = [];
            for (var product of products) {
                if(product.category_id == 2){
                    results.push(product);
                }
            }
            console.log(results);
            this.products = results;
        },
        reloadHeader() {
            var key = Math.random();
            this.key = key;
        }
    },
    mounted() {
        this.getProducts();
    }
};

</script>
<style scoped>
</style>