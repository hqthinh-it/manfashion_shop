<template>
    <nav class="navbar navbar-expand-sm" :class="{ 'sticky': isSticky }">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon">
            </span>
        </button>
        <a class="navbar-brand" href="#">
            <img src="@/assets/image/homepage/logo.png" alt="" style="width: 50px;">
        </a>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul id="main-menu" class="main-menu navbar-nav mb-2 mb-lg-0">
                <router-link :to="{
                    name: 'products-manage',
                }">
                    <li class="nav-item" style="--x:1"><a href="">Sản phẩm</a></li>
                </router-link>
                <router-link :to="{
                    name: 'order-manage',
                }">
                <li class="nav-item" style="--x:2"><a href="">Đơn Hàng</a></li>
                </router-link>
                <router-link :to="{
                    name: 'users-manage',
                }">
                <li class="nav-item" style="--x:3"><a href="">Người Dùng</a></li>
                </router-link>
            </ul>
        </div>
        <div class="btn-logout">
            <button class="btn btn-outline-success" @click="logout()" :class="{ 'sticky-right': isSticky }" type="button"><i
                    class="fa-solid fa-right-from-bracket"></i></button>
        </div>
    </nav>
</template>

<script>
import appRightBar from "@/components/appheader/AppRightBar.vue";

import authService from "@/services/auth.service";

export default {
    components: {
        appRightBar,
    },
    data() {
        return {
            isSticky: false,
            products: null,
        };
    },
   
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.isSticky = window.scrollY > 0;
        },
        async logout() {
            await authService.logout();
            this.$router.push({ name: "manfashion" });
        },

    },
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
    z-index: 100;
}

.sticky-right {
    color: white !important;
    background-color: rgb(12, 149, 35);
}

.user-icon {
    padding: 0 !important;
}

.btn-logout{
    position: absolute;
    float: right;
    right: 10px;
}
</style>