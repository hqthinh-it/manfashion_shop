
<template>
    <AppHeader :key="getKey" @submit:user="reloadHeader" />
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-6 register-sec">
                <h1 class="text-center mb-3 title">Đăng Ký Tài Khoản</h1>
                <Form @submit="register" :validation-schema="registerFormSchema">
                    <div class="row">
                        <div class="form-group col-md-8">
                            <label for="fullname" class="register-label"><b>Họ Tên:</b></label>
                            <Field id="fullname" name="fullname" type="text" class="form-control" v-model="data.fullname" />
                            <ErrorMessage name="fullname" class="error-feedback text-danger" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="gender" class="register-label"><b>Giới tính:</b></label>
                            <Field id="gender" name="gender" as="select" class="form-control" v-model="data.gender">
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </Field>
                            <ErrorMessage name="gender" class="error-feedback text-danger" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-6">
                            <label for="username" class="register-label"><b>Tên đăng nhập:</b></label>
                            <Field name="username" type="text" class="form-control" v-model="data.username" />
                            <ErrorMessage id="username" name="username" class="error-feedback text-danger" />
                        </div>
                        <div class="form-group password-container col-md-6">
                            <label for="password" class="register-label"><b>Mật khẩu:</b></label>
                            <Field ref="password" id="password" name="password" type="password" class="form-control"
                                v-model="data.password" />
                            <ErrorMessage name="password" class="error-feedback text-danger" />
                            <span id="togglePassword" @click="togglePasswordVisibility"><i
                                    class="fa-solid fa-eye"></i></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-12">
                            <label for="address" class="register-label"><b>Địa chỉ:</b></label>
                            <Field name="address" type="text" class="form-control" v-model="data.address" />
                            <ErrorMessage id="address" name="address" class="error-feedback text-danger" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-8">
                            <label for="email" class="register-label"><b>Email:</b></label>
                            <Field name="email" type="text" class="form-control" v-model="data.email" />
                            <ErrorMessage id="email" name="email" class="error-feedback text-danger" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="phone" class="register-label"><b>Số điện thoại:</b></label>
                            <Field name="phone" type="text" class="form-control" v-model="data.phone" />
                            <ErrorMessage id="phone" name="phone" class="error-feedback text-danger" />
                        </div>
                    </div>
                    <button class="btn btn-outline-success float-right"><b>Đăng ký</b></button>
                </Form>
            </div>
            <div class="col-md-6 banner-sec">
                <div class="carousel-inner" role="listbox">
                    <div class="carousel-item active">
                        <img class="d-block img-fluid" src="@/assets/image/homepage/baner.jpg"
                            alt="First slide">
                            <img class="d-block img-fluid" src="@/assets/image/homepage/speed-1500X600.jpg"
                            alt="">
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
    emits: ["register:user"],
    data() {
        const registerFormSchema = yup.object().shape({

            fullname: yup
                .string()
                .required("Vui lòng nhập vào họ tên")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            username: yup
                .string()
                .required("Vui lòng nhập vào tên đăng nhập")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
            password: yup
                .string()
                .required("Vui lòng nhập vào mật khẩu")
                .max(50, "Mật khẩu có nhiều nhất 50 ký tự."),
            email: yup
                .string()
                .required("Vui lòng nhập vào email")
                .email("Email không hợp lệ"),
            address: yup
                .string()
                .required("Vui lòng nhập vào địa chỉ"),
            phone: yup
                .string()
                .required("Vui lòng nhập vào số điện thoại")
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
        });

        return {
            registerFormSchema,
            data: {
                fullname: "",
                username: "",
                password: "",
                email: "",
                address: "",
                phone: "",
                role: "customer"

            },

            showPassword: false
        };
    },
    computed: {
        getKey() {
            return this.key;
        }
    },

    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
            const passwordInput = document.getElementById('password');
            passwordInput.type = this.showPassword ? 'text' : 'password';
        },

        async register() {
            try {
                var data = await AuthService.register(this.data);
                if (data) {
                    alert("Đăng ký thành công! Chuyển đến trang đăng nhập");
                    this.$router.push({ name: "login" });
                }
            } catch (error) {
                $('#error').addClass('active');
            }
        },

        handleScroll() {
            this.isSticky = window.scrollY > 0;
        },

        async getUser() {
            var user = await authService.get();
            this.user = user;
        },
    },
};
</script>

<style scoped>
.register-label {
    color: rgb(2, 101, 18);
}

.password-container {
    position: relative;
}

#password {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
}

#togglePassword {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-10%);
    cursor: pointer;
}
</style>