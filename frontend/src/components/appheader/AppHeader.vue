<template>
    <nav class="navbar navbar-expand-sm" :class="{ 'sticky': isSticky }">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon">
            </span>
        </button>
        <a class="navbar-brand" href="/">
            <img src="@/assets/image/homepage/logo.png" alt="" style="width: 50px;">
        </a>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul id="main-menu" class="main-menu navbar-nav mb-2 mb-lg-0">
                <router-link :to="{
                    name: 'collection',
                }">
                    <li class="nav-item" style="--x:1"><a href="">Bộ Sưu Tập</a></li>
                </router-link>
                <router-link :to="{
                    name: 'tshirt',
                }">
                <li class="nav-item" style="--x:2"><a href="">Áo Thun</a></li>
                </router-link>
                <router-link :to="{
                    name: 'shirt',
                }">
                <li class="nav-item" style="--x:3"><a href="">Áo Sơ Mi</a></li>
                </router-link>
                <router-link :to="{
                    name: 'jacket',
                }">
                    <li class="nav-item" style="--x:4"><a href="">Áo Khoác</a></li>
                </router-link>
            </ul>
        </div>
        <appRightBar @logout:user="noneUser" :user="User" />
    </nav>
</template>

<script>
import appRightBar from "@/components/appheader/AppRightBar.vue";
import authService from "@/services/auth.service";

function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}
export default {
    components: {
        appRightBar,
    },
    emits: ['submit:user'],
    data() {
        return {
            isSticky: false,
            user: null,
            products: null,
        };
    },
    computed: {
        User() {
            return this.user;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        var token = getCookie("token");
        if (token) {
            this.getUser();
        }
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.isSticky = window.scrollY > 0;
        },

        async getUser() {
            var user = await authService.get();
            this.user = user;
        },

        noneUser() {
            this.user = null;
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
</style>