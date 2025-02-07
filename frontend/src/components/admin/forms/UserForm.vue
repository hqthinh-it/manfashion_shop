<template>
    <Form @submit="submitUser" :validation-schema="userFormSchema">
        <div class="row">
            <div class="form-group col-md-8">
                <label for="fullname" class="register-label"><b>Họ Tên:</b></label>
                <Field id="fullname" name="fullname" type="text" class="form-control" v-model="userLocal.fullname" />
                <ErrorMessage name="fullname" class="error-feedback text-danger" />
            </div>
            <div class="form-group col-md-4">
                <label for="gender" class="register-label"><b>Giới tính:</b></label>
                <Field id="gender" name="gender" as="select" class="form-control" v-model="selected">
                    <option v-for="option in options" :value="option.id">
                        {{ option.name }}
                    </option>
                </Field>
                <ErrorMessage name="gender" class="error-feedback text-danger" />
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-6">
                <label for="username" class="register-label"><b>Tên đăng nhập:</b></label>
                <Field name="username" type="text" class="form-control" v-model="userLocal.username" />
                <ErrorMessage id="username" name="username" class="error-feedback text-danger" />
            </div>
            <div class="form-group password-container col-md-6">
                <label for="password" class="register-label"><b>Mật khẩu:</b></label>
                <Field ref="password" id="password" name="password" type="text" class="form-control"
                    v-model="userLocal.password" />
                <ErrorMessage name="password" class="error-feedback text-danger" />
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-12">
                <label for="address" class="register-label"><b>Địa chỉ:</b></label>
                <Field name="address" type="text" class="form-control" v-model="userLocal.address" />
                <ErrorMessage id="address" name="address" class="error-feedback text-danger" />
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-8">
                <label for="email" class="register-label"><b>Email:</b></label>
                <Field name="email" type="text" class="form-control" v-model="userLocal.email" />
                <ErrorMessage id="email" name="email" class="error-feedback text-danger" />
            </div>
            <div class="form-group col-md-4">
                <label for="phone" class="register-label"><b>Số điện thoại:</b></label>
                <Field name="phone" type="text" class="form-control" v-model="userLocal.phone" />
                <ErrorMessage id="phone" name="phone" class="error-feedback text-danger" />
            </div>
        </div>
        <button class="btn btn-outline-success float-right"><b>Cập nhật</b></button>
    </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:user", "delete:user"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const userFormSchema = yup.object().shape({
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
                .required("Vui lòng nhập vào mật khẩu"),
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
            userLocal: this.user,
            userFormSchema,
            selected: this.user.gender,
            options: [
                { name: 'Nam', id: 1 },
                { name: 'Nữ', id: 2 },
            ]
        };
    },
    methods: {
        submitUser() {
            this.user.gender = this.selected;
            this.$emit("submit:user", this.userLocal);
        },
        deleteUser() {
            this.$emit("delete:user", this.userLocal.id);
        },
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
