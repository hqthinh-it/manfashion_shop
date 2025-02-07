<template>
    <AppHeader />
    <div class="container mb-5">
        <div class="row mt-5">
            <div class="col-md-4 login-sec">
                <h1 class="text-center mb-3 title">Đăng Nhập</h1>
                <Form @submit="login" :validation-schema="loginFormSchema">
                    <div class="form-group">
                        <label for="username" class="login-label"><b>Tên đăng nhập:</b></label>
                        <Field @change="removeError" id="username" name="username" type="text" class="form-control"
                            v-model="data.username" />
                        <ErrorMessage name="username" class="error-feedback" />

                    </div>
                    <div class="form-group password-container">
                        <label for="password" class="login-label"><b>Mật khẩu:</b></label>
                        <Field @change="removeError" ref="password" id="password" name="password" type="password"
                            class="form-control" v-model="data.password" />
                        <ErrorMessage name="password" class="error-feedback" />
                        <span id="togglePassword" @click="togglePasswordVisibility"><i class="fa-solid fa-eye"></i></span>
                    </div>
                    <div id="error" class="error-feedback text-danger">
                        <p>Sai thông tin đăng nhập</p>
                    </div>
                    <div class="register-box">
                        <label class="register">
                            <small>Bạn chưa có tài khoản?&nbsp</small>
                            <router-link :to="{ name: 'register' }" class="register-link">
                                <small>Đăng ký tại đây</small>
                            </router-link>
                        </label>
                    </div>
                    <button class="btn btn-outline-success float-right"><b>Đăng nhập</b></button>
                </Form>
            </div>
            <div class="col-md-8 banner-sec">
                <div class="carousel-inner" role="listbox">
                    <div class="carousel-item active">
                        <img class="d-block img-fluid" src="@/assets/image/homepage/baner.jpg"
                            alt="First slide">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import AppHeader from "@/components/appheader/AppHeader.vue";

import AuthService from "@/services/auth.service";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        AppHeader,
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:user"],
    data() {
        const loginFormSchema = yup.object().shape({
            username: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            password: yup
                .string()
                .max(50, "Mật khẩu có nhiều nhất 50 ký tự."),

        });

        return {
            loginFormSchema,
            data: {
                username: "",
                password: "",
            },
            showPassword: false
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
            const passwordInput = document.getElementById('password');
            passwordInput.type = this.showPassword ? 'text' : 'password';
        },
        async login() {
            try {
                var token = await AuthService.login(this.data);
            } catch (error) {
                console.log(error)
            }
            if (token) {
                var isAdmin = await AuthService.isAdmin(token);
                if (!isAdmin) {
                    this.$emit('submit:user');
                    alert("Đăng nhập thành công");
                    this.$router.push({ name: "manfashion" });
                } else {
                    this.$emit('submit:user');
                    alert("Admin");
                    this.$router.push({ name: "admin"} );
                }
            } else {
                $('#error').addClass('active');
            }
        },

        removeError() {
            $('#error').removeClass('active');
        }
    },
};
</script>

<style scoped>
.login-label {
    color: rgb(2, 101, 18);
}

.password-container {
    position: relative;
    width: 350px;
}

#password {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
}

#togglePassword {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(25%);
    cursor: pointer;
}

.error-feedback {
    display: none;
}

.error-feedback.active {
    display: block;
}
</style>