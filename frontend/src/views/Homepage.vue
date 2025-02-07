<template>
    <AppHeader :key="getKey" @submit:user="reloadHeader" />
    <div id="carouselExampleIndicators" class="carousel slide mt-5 ">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="@/assets/image/homepage/baner.jpg" class="d-block w-100" alt="...">
            </div>
        </div>
    </div>
    <div class="container-fluid pt-5 my-5 px-5">
        <h1 class="title mb-4 text-center">BỘ SƯU TẬP - SPEED</h1>
        <ProductList :products="productsCollection" />
    </div>
    <div class="container-fluid pt-5 my-5 px-5">
        <h1 class="title mb-4 text-center">ÁO THUN</h1>
        <ProductList :products="productsTshirt" />
    </div>
    <div class="container-fluid pt-5 my-5 px-5">
        <h1 class="title mb-4 text-center">ÁO SƠ MI</h1>
        <ProductList :products="productsShirt" />
    </div>
    <div class="container-fluid pt-5 my-5 px-5">
        <h1 class="title mb-4 text-center">ÁO KHOÁC</h1>
        <ProductList :products="productsJacket" />
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
            // products: [],
            productsCollection: [],
            productsShirt: [],
            productsTshirt: [],
            productsJacket: [],

        };
    },

    computed: {
        getKey() {
            return this.key;
        }
    },

    methods: {
        // async getProducts() {
        //     const products = await ProductService.getAll();
        //     this.products = products;
        // },

        async getProductsCollection() {
            const products = await ProductService.getAll();
            var results1 = [];
            let count = 0;
            for (var product of products) {
                if(product.category_id == 1 && count < 4){
                    results1.push(product);
                    count += 1;
                }
            }
            this.productsCollection = results1;
        },

        async getProductsTshirt() {
            const products = await ProductService.getAll();
            var results2 = [];
            let count = 0;
            for (var product of products) {
                if(product.category_id == 2 && count < 4){
                    results2.push(product);
                    count += 1;
                }
            }
            this.productsTshirt = results2;
        },

        async getProductsShirt() {
            const products = await ProductService.getAll();
            var results3 = [];
            let count = 0;
            for (var product of products) {
                if(product.category_id == 3 && count < 4){
                    results3.push(product);
                    count += 1;
                }
            }
            this.productsShirt = results3;
        },
       
        async getProductsJacket() {
            const products = await ProductService.getAll();
            var results4 = [];
            let count = 0;
            for (var product of products) {
                if(product.category_id == 4 && count < 4){
                    results4.push(product);
                    count += 1;
                }
            }
            this.productsJacket = results4;
        },
        reloadHeader() {
            var key = Math.random();
            this.key = key;
        }
    },
    mounted() {
        // this.getProducts();
        this.getProductsCollection();
        this.getProductsTshirt();
        this.getProductsShirt()
        this.getProductsJacket();
    }
};

</script>
<style scoped>
</style>