<template>
    <div class="container-fluid p-0">
        <AdminHeader />

        <div class="row mt-5 mx-2" id="body-row">

            <!-- LEFT MENU -->
            <LeftMenuAdmin />
            <!-- MAIN -->
            <div class="col">

                <h1 class="title">
                    Thêm Người dùng
                </h1>
                <hr>
                <div v-if="user" class="card table-container mt-4 p-5 backround-form">
                    <div class="update-form">
                        <UserForm :user="user" @submit:user="addUser" />
                    </div>
                </div>
            </div>
        </div><!-- Main Col END -->

    </div> <!-- container -->
</template>

<script>
import LeftMenuAdmin from "@/components/appheader/LeftMenuAdmin.vue";
import AuthService from "@/services/auth.service.js";
import UserForm from "@/components/admin/forms/UserForm.vue";
import AdminHeader from "@/components/appheader/AdminHeader.vue";


export default {
    components: {
        AdminHeader,
        LeftMenuAdmin,
        UserForm
    },
    data() {
        return {
            user: {
                "username": "",
                "password": "",
                "fullname": "",
                "gender": "",
                "email": "",
                "address": "",
                "phone": "",
            },
            message: "",
        };
    },
    // props: {
    //     id: { type: String, required: true }
    // },
    methods: {
        async addUser(data) {
            try {
                await AuthService.create(data);
                this.message = "Thêm tài khoản thành công";
                alert(this.message);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteContact() {
            if (confirm("Bạn muốn xóa Liên hệ này?")) {
                try {
                    await AuthService.delete(this.user._id);
                    this.$router.push({ name: "contactbook" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    // async created() {
    //     await this.getUser(this.id);
    //     this.message = "";
    // },
}
</script>

<style>
.backround-form {
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
    box-shadow: 1px 2px 10px rgb(2, 101, 18);
    background-image: url(@/assets/image/homepage/form.jpeg);
    background-size: cover;
}

thead {
    border-radius: 5px !important;
    color: rgb(2, 101, 18) !important;
}

.update-form {
    width: 600px;
    border-radius: 10px;
    border: 1px solid #ccc;
    margin: auto;
    padding: 50px;
    box-shadow: 1px 2px 10px rgb(2, 101, 18);
    background-color: white;
}
</style>
