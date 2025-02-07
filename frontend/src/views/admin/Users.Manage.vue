<template>
    <div class="container-fluid p-0">
        <AdminHeader :key="getKey" @submit:user="reloadHeader" />
        <div class="row mt-5 mx-2" id="body-row">

            <!-- LEFT MENU -->
            <LeftMenuAdmin />
            <!-- MAIN -->
            <div class="col">
                <div class="row">
                    <h1 class="title mx-3">
                        Quản lý Người dùng
                    </h1>
                    <div class="add-user mx-3 mt-2">
                        <button type="button" @click="goToAddUser" class="btn rounded-circle" name="btn-update"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <hr>
                <div class="card table-container mt-4">
                    <table class="table caption-top">
                        <thead class="text-center">
                            <tr>
                                <td><small><b>Username</b></small></td>
                                <td class="width:100px"><small><b>Password</b></small></td>
                                <td><small><b>Fullname</b></small></td>
                                <td><small><b>Gender</b></small></td>
                                <td><small><b>Email</b></small></td>
                                <td><small><b>Address</b></small></td>
                                <td><small><b>Phone</b></small></td>
                                <td><small><b>Role</b></small></td>
                                <td><small><b>Action</b></small></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="user._id" :class="{ active: index === activeIndex }">
                                <td>{{ user.username }}</td>
                                <td>{{ user.password}}</td>
                                <td>{{ user.fullname }}</td>
                                <td v-if="user.gender == 1">Nam</td>
                                <td v-if="user.gender == 2">Nữ</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.address }}</td>
                                <td>{{ user.phone }}</td>
                                <td>{{ user.role }}</td>
                                <td>
                                    <router-link :to="{
                                        name: 'user.edit',
                                        params: { id: user._id },
                                    }"><button type="button" class="btn rounded-circle" name="btn-update"> <i
                                                class="fa-solid fa-pen"></i></button>
                                    </router-link>
                                    <a href=""> <button type="button" class="btn rounded-circle mx-1" @click="deleteUser" name="btn-detele" :id="user._id">
                                            <i class="fa-solid fa-trash-can"></i></button> </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div><!-- Main Col END -->

    </div> <!-- container -->
</template>

<script>
import LeftMenuAdmin from "@/components/appheader/LeftMenuAdmin.vue";
import AuthService from "@/services/auth.service.js";
import AdminHeader from "@/components/appheader/AdminHeader.vue";

export default {
    components: {
        AdminHeader,
        LeftMenuAdmin,
    },
    data() {
        return {
            users: [],
            activeIndex: -1,
            searchText: "",
        };
    },

    methods: {
        async retrieveUsers() {
            try {
                this.users = await AuthService.getAll();
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveUsers();
            this.activeIndex = -1;
        },

        goToAddUser() {
            this.$router.push({ name: "user.add" });
        },

        async deleteUser(e) {
            var id = $(e.currentTarget).attr("id");
            if (confirm("Bạn muốn xóa Người dùng này?")) {
                await AuthService.delete(id);
            }
        },

        // updateUser(index) {
        //     this.$emit("update:activeIndex", index);
        // }
    },
    mounted() {
        this.refreshList();
    },
}
</script>

<style>
.table-container {
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
    box-shadow: 1px 2px 10px rgb(2, 101, 18);
}

thead {
    border-radius: 5px !important;
    color: rgb(2, 101, 18) !important;
}
</style>
