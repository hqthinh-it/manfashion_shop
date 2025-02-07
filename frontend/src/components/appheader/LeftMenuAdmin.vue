<template>
    <!-- Bootstrap row -->
    <!-- Sidebar -->
    <div id="sidebar-container" class="sidebar-expanded d-none d-md-block">
        <!-- d-* hiddens the Sidebar in smaller devices. Its itens can be kept on the Navbar 'Menu' -->
        <!-- Bootstrap List Group -->
        <ul class="list-group">
            <!-- Separator with title -->
            <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small>MAIN MENU</small>
            </li>
            <!-- /END Separator -->
            <!-- Menu with submenu -->
            <router-link :to="{ name: 'admin' }"
                class="list-group-item list-group-item-action flex-column align-items-start">

                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="fa fa-dashboard fa-fw mr-3"></span>
                    <span class="menu-collapsed"><small><b>Dashboard</b></small></span>
                    <span class="submenu-icon ml-auto"></span>
                </div>
            </router-link>

            <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small>OPTIONS</small>
            </li>
            <!-- /END Separator -->
            <router-link :to="{ name: 'products-manage' }" class=" list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="menu-collapsed"><small><b><i class="fa-solid fa-shirt"></i>&nbspQuản lý Sản
                                phẩm</b></small></span>
                </div>
            </router-link>

            <router-link :to="{ name: 'order-manage' }" class=" list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="menu-collapsed"><small><b><i class="fa-solid fa-cart-shopping"></i>&nbspQuản lý Đơn
                                hàng</b></small></span>
                </div>
            </router-link>

            <router-link :to="{ name: 'users-manage' }" class=" list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-start align-items-center">
                    <span class="menu-collapsed"><small><b><i class="fa-solid fa-users"></i>&nbspQuản lý Người
                                dùng</b></small></span>
                </div>
            </router-link>

            <!-- Logo -->
            <li class="list-group-item logo-separator d-flex justify-content-center">
            </li>
        </ul><!-- List Group END-->
    </div><!-- sidebar-container END -->
</template>

<script>
</script>

<style scoped>
#sidebar-container {
    min-height: 100vh;
    background-color: white !important;
    padding: 0;
}

.sidebar-expanded {
    width: 230px;
}

.sidebar-collapsed {
    /*width: 60px;*/
    width: 100px;
}

/* ----------| Menu item*/
#sidebar-container .list-group a {
    height: 50px;
    color: white;
}

/* ----------| Submenu item*/
#sidebar-container .list-group li.list-group-item {
    background-color: rgb(2, 101, 18) !important;
    color: white !important;
}

#sidebar-container .list-group .sidebar-submenu a {
    height: 45px;
    padding-left: 30px;
}

.sidebar-submenu {
    font-size: 0.9rem;
}

/* ----------| Separators */
.sidebar-separator-title {
    color: white;
    height: 35px;
}

.sidebar-separator {
    background-color: white !important;
    height: 25px;
}

.logo-separator {
    background-color: white !important;
    height: 60px;
}

#sidebar-container a {
    color: rgb(2, 101, 18) !important;
    border: 1px solid rgb(2, 101, 18) !important;
}

#sidebar-container a:hover {
    background-color: rgb(244, 123, 31) !important;
    color: white !important;
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