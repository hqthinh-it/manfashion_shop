<template>
    <div class="container-fluid p-0">
        <AdminHeader :key="getKey" @submit:user="reloadHeader" />
        <div class="row mt-5 mx-2" id="body-row">
            <!-- LEFT MENU -->
            <LeftMenuAdmin />
            <!-- MAIN -->
            <div class="col">

                <h1 class="title">
                    Trang Quản Lý - Manfashion Shop
                </h1>

                <div class="card">
                    <h4 class="card-header">Dashboard</h4>
                    <div class="card-body">
                        <div class="row">
                            <div class="card col-md-4" style="width: 18rem;">
                                <h5 class="card-header card-header-child">Quản lý Sản phẩm</h5>
                                <div class="card-body image-brg">
                                    <h2 class="card-subtitle mb-2"><i class="fa-solid fa-shirt"></i></h2>

                                    <router-link :to="{ name: 'products-manage' }" class="user-icon nav-link">
                                        <button class="btn btn-outline-success float-right mt-2"><b><i
                                                    class="fa-solid fa-arrow-right"></i></b></button>
                                    </router-link>
                                </div>
                            </div>
                            <div class="card col-md-4" style="width: 18rem;">
                                <h5 class="card-header card-header-child">Quản lý Đơn hàng</h5>
                                <div class="card-body image-brg">
                                    <h2 class="card-subtitle mb-2"><i class="fa-solid fa-cart-shopping"></i></h2>
                                    <router-link :to="{ name: 'order-manage' }" class="user-icon nav-link">
                                        <button class="btn btn-outline-success float-right mt-2"><b><i
                                                    class="fa-solid fa-arrow-right"></i></b></button>
                                    </router-link>
                                </div>
                            </div>
                            <div class="card col-md-4" style="width: 18rem;">
                                <h5 class="card-header card-header-child">Quản lý Người dùng</h5>
                                <div class="card-body image-brg">
                                    <h2 class="card-subtitle mb-2"><i class="fa-solid fa-users"></i></h2>
                                    <router-link :to="{ name: 'users-manage' }" class="user-icon nav-link">
                                        <button class="btn btn-outline-success float-right mt-2"><b><i
                                                    class="fa-solid fa-arrow-right"></i></b></button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div><!-- Main Col END -->

    </div> <!-- container -->
</template>

<script>
import AdminHeader from "@/components/appheader/AdminHeader.vue";
import LeftMenuAdmin from "@/components/appheader/LeftMenuAdmin.vue";
export default {
    components: {
        LeftMenuAdmin,
        AdminHeader
    },
    methods: {
        reloadHeader() {
            var key = Math.random();
            this.key = key;
        }
    },
}
</script>

<style>
.page {
    max-width: 400px;
    margin: auto;
}
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

/*-------------------------------- END ----*/
#body-row {
    margin-left: 0;
    margin-right: 0;
}

.image-brg {
    background-image: url(@/assets/image/homepage/background.png);
    background-size: cover;
    opacity: 0.9;
}


.card {
    border: none;
}

.card-header {
    background-color: rgb(2, 101, 18) !important;
    color: white;
}

.card-body {
    border: 1px solid rgb(2, 101, 18) !important;
    border-radius: 0px 0px 5px 5px !important;
}

.card-header-child {
    background-color: rgb(244, 123, 31) !important;
    border: 1px solid rgb(2, 101, 18);
    text-align: center;
}

.card-subtitle {
    color: rgb(244, 123, 31);
    text-align: center;
}

.card > button{
    color:rgb(244, 123, 31) !important;
    border: 2px solid rgb(244, 123, 31) !important;
}

.card-header {
    background-color: rgb(2, 101, 18) !important;
    color: white;
}


.card > button:hover{
    background-color:white !important;
}
</style>
