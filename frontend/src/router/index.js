import { createWebHistory, createRouter } from "vue-router";
import Homepage from "@/views/Homepage.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import AuthService from "../services/auth.service";
// Admin
import Dashboard from "@/views/admin/Dashboard.vue";
import UserManage from "@/views/admin/Users.Manage.vue";
import ProductManage from "@/views/admin/Products.Manage.vue";
import OrderManage from "@/views/admin/Order.Manage.vue";

import UserUpdate from "@/views/admin/user/UsersUpdate.vue";
import UserAdd from "@/views/admin/user/UsersAdd.vue";
import ProductUpdate from "@/views/admin/product/ProductUpdate.vue";
import ProductAdd from "@/views/admin/product/ProductAdd.vue";


// Customer
import ProductDetailPage from "@/views/ProductDetailPage.vue";
import CollectionPage from "@/views/CollectionPage.vue";
import ShirtPage from "@/views/ShirtPage.vue";
import TshirtPage from "@/views/TshirtPage.vue";
import JacketPage from "@/views/JacketPage.vue";
import CartPage from "@/views/CartPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";



function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

const routes = [
    {
        path: "/",
        name: "manfashion",
        component: Homepage,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    // ADMIN
    {
        path: "/admin",
        name: "admin",
        component: Dashboard,
        meta: {
            authRequire: true,
            roleRequire: true,
        },
    },

 // Products Management
    {
        path: "/products-manage",
        name: "products-manage",
        component: ProductManage,
        meta: {
            authRequire: true,
            roleRequire: true,
        },
    },
    {
        path: "/products/add",
        name: "product.add",
        component: ProductAdd,
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/products/:id",
        name: "product.edit",
        component: ProductUpdate,
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/order-manage",
        name: "order-manage",
        component: OrderManage,
        meta: {
            authRequire: true,
            roleRequire: true,
        },
    },
    // User Management
    {
        path: "/users-manage",
        name: "users-manage",
        component: UserManage,
        meta: {
            authRequire: true,
            roleRequire: true,
        },
    },
    {
        path: "/users/add",
        name: "user.add",
        component: UserAdd,
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/users/:id",
        name: "user.edit",
        component: UserUpdate,
        props: true // Truyền các biến trong $route.params vào làm props
    },



    // ***Customer
    
    {
        path: "/product/collection",
        name: "collection",
        component: CollectionPage,
        // props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/product/tshirt",
        name: "tshirt",
        component: TshirtPage,
        // props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/product/shirt",
        name: "shirt",
        component: ShirtPage,
        // props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/product/jacket",
        name: "jacket",
        component: JacketPage,
        // props: true // Truyền các biến trong $route.params vào làm props
    },

    // ProductDetail Page
    {
        path: "/product/detail/:id",
        name: "product.detail",
        component: ProductDetailPage,
        props: true // Truyền các biến trong $route.params vào làm props
    },
    {
        path: "/product/cart",
        name: "cart",
        component: CartPage,
        props: true // Truyền các biến trong $route.params vào làm props
    },

    {
        path: "/profile",
        name: "profile",
        component: ProfilePage,
        props: true // Truyền các biến trong $route.params vào làm props
    },

    
];



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from) => {
    var token = getCookie("token");
    if (to.meta.authRequire) {
        if (token) {
            if (to.meta.roleRequire) {
                var isAdmin = AuthService.isAdmin();
                if (!isAdmin) {
                    return ({ name: 'manfashion' });
                }
            }
        } else {
            return ({ name: 'login' });
        }
    } else {
        if (token && (to.name == 'login' || to.name == 'register')) {
            return ({ name: 'manfashion' });
        }
    }
});


export default router;