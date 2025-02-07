<template>
    <div id="search-box" v-if="searchInput">
        <table class="table table-hover">
            <div v-for="item in filteredProducts" class="mt-2">
                <router-link :to="{
                    name: 'product.detail',
                    params: { id: item._id },
                }" class="noneUnderline">
                    <tr class="search-item">
                        <td>
                            <p class="title"> <small> <b>{{ item.productname }}</b> </small></p>
                        </td>
                        <td v-for="image in item.images">
                            <img class="m-auto" :src="'http://localhost:8000/' + image.link" alt="" style="width: 70px">
                        </td>
                    </tr>
                </router-link>
            </div>
        </table>
    </div>
    <div class="right-bar d-flex">
        <div class="input-group me-2">
            <input id="search" type="text" class="form-control" placeholder="Entering to find....."
                aria-label="Entering to find....." aria-describedby="search-btn" @input="searchByName">
            <button class="btn btn-outline-success" :class="{ 'sticky-right': isSticky }" type="submit" id="search-btn"><i
                    class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div v-if="!this.user">
            <router-link :to="{ name: 'login' }" class="user-icon nav-link">
                <button class="btn btn-outline-success" :class="{ 'sticky-right': isSticky }" type="button"><i
                        class="fa-solid fa-user"></i></button>
            </router-link>
        </div>
        <div v-if="this.user">
            <router-link :to="{ name: 'profile' }" class="user-icon nav-link">
                <button class="btn btn-outline-success" :class="{ 'sticky-right': isSticky }" type="button"><i
                        class="fa-solid fa-user"></i></button>
            </router-link>
        </div>
        <div v-if="this.user">
            <router-link :to="{ name: 'cart' }" class="user-icon nav-link">
                <button class="btn btn-outline-success" :class="{ 'sticky-right': isSticky }" type="button"><i
                        class="fa-solid fa-cart-shopping"></i></button>
            </router-link>
        </div>
        <div v-if="this.user">
            <button class="btn btn-outline-success" @click="logout()" :class="{ 'sticky-right': isSticky }" type="button"><i
                    class="fa-solid fa-right-from-bracket"></i></button>
        </div>
    </div>
</template>


<script>
import authService from "@/services/auth.service";
import ProductService from "@/services/products.service.js";

export default {
    data() {
        return {
            isSticky: false,
            searchInput: "",
            filteredProducts: [],
        };
    },
    emit: ['logout:user'],
    props: {
        user: { type: Object, default: {} }
    },
    methods: {
        async logout() {
            await authService.logout();
            this.$router.push({ name: "manfashion" });
            this.$emit('logout:user');
        },

        async searchByName(e) {
            var products = await ProductService.getAll();

            const searchValue = e.target.value.toLowerCase();

            const filteredProducts = products.filter(product => {
                return product.productname.toLowerCase().includes(searchValue);
            });

            this.searchInput = searchValue;
            this.filteredProducts = filteredProducts;
        }


    }
};


</script>


<style scoped>
.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    border-bottom: 2px solid rgb(2, 101, 18);
    /* color: white; */
    background-color: white;
    height: 80px;
}

.sticky-right {
    color: white !important;
    background-color: rgb(12, 149, 35);
}

.user-icon {
    padding: 0 !important;
}

#search-btn {
    border-radius: 0px 5px 5px 0px !important;
}

#search-box {
    background-color: #fcf9f9;
    border: 1px solid #f0f0f0;
    box-shadow: 1px 2px 10px rgb(12, 149, 35);
    border-radius: 5px;
    width: 30rem;
    /* height: 30rem; */
    position: fixed;
    top: 100px;
    right: 0;
    z-index: 100;
}

.search-item{
    padding: 20px;
}

.search-item:hover{
    background-color: white;
    text-decoration: none !important;
}

.noneUnderline{
    text-decoration: none !important;
}


</style>