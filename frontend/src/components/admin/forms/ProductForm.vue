<template>
    <Form @submit="submitProduct" :validation-schema="productFormSchema">
        <div class="row">
            <div class="form-group col-md-4">
                <label for="category" class=""><b>Danh mục:</b></label>
                <Field id="category" name="category" as="select" class="form-control" v-model="selectedCategory">
                    <option v-for="option in category" :value="option.id">
                        {{ option.name }}
                    </option>
                </Field>
                <ErrorMessage name="category" class="error-feedback text-danger" />
            </div>
            <div class="form-group col-md-8">
                <label for="productname" class=""><b>Tên Sản Phẩm:</b></label>
                <Field id="productname" name="productname" type="text" class="form-control"
                    v-model="productLocal.productname" />
                <ErrorMessage name="productname" class="error-feedback text-danger" />
            </div>
            <div class="form-group col-md-3">
                <label for="color" class=""><b>Màu Sắc:</b></label>
                <Field id="color" name="color" type="text" class="form-control"
                    v-model="productLocal.color" />
                <ErrorMessage name="color" class="error-feedback text-danger" />
            </div>
            <div class="form-group col-md-3">
                <label for="size" class=""><b>Kích thước:</b></label>
                <Field id="size" name="size" as="select" class="form-control" v-model="selectedSize">
                    <option v-for="option in sizeList" :value="option.id">
                        {{ option.name }}
                    </option>
                </Field>
                <ErrorMessage name="size" class="error-feedback text-danger" />
            </div>
            <div class="form-group col-md-3">
                <label for="price" class=""><b>Giá tiền:</b></label>
                <Field name="price" type="text" class="form-control" v-model="productLocal.price" />
                <ErrorMessage id="price" name="price" class="error-feedback text-danger" />
            </div>
            <div class="form-group col-md-3">
                <label for="amount" class=""><b>Số lượng:</b></label>
                <Field name="amount" type="text" class="form-control" v-model="productLocal.amount" />
                <ErrorMessage id="amount" name="amount" class="error-feedback text-danger" />
            </div>
            <div class="form-group col-md-12">
                <label for="color" class=""><b>Hình ảnh:</b></label>
                <Field name="image" type="file" multiple class="form-control" @change="saveImage"
                    v-model="productLocal.imgProduct" />
                <ErrorMessage name="image" class="error-feedback text-danger" />
            </div>
            <!-- <img :src="'http://localhost:8000/'+productLocal.images[0].link" alt=""> -->

            <div class="form-group col-md-12">
                <label for="color" class=""><b>Mô tả:</b></label>
                <Field name="decribe" as="textarea" class="form-control" v-model="productLocal.decribe" />
                <ErrorMessage name="decribe" class="error-feedback text-danger" />
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
    emits: ["submit:product"],
    props: {
        product: { type: Object, required: true }
    },
    data() {
        const productFormSchema = yup.object().shape({
            category_id: yup
                .string(),
            productname: yup
                .string(),
            // .required("Vui lòng nhập vào tên sản phẩm")
            // .min(2, "Tên phải ít nhất 2 ký tự.")
            // .max(50, "Tên có nhiều nhất 50 ký tự."),
            color: yup
                .string(),
            amount: yup
                .number(),
            decribe: yup
                .string(),
            // .required("Vui lòng nhập vào mô tả"),
        });
        return {
            category: [
                { name: 'Bộ Sưu Tập', id: 1 },
                { name: 'Áo Thun', id: 2 },
                { name: 'Áo Sơ Mi', id: 3 },
                { name: 'Áo Khoác', id: 4 },

            ],
    
            sizeList: [
                { name: 'M', id: 1 },
                { name: 'L', id: 2 },
                { name: 'XL', id: 3 },
            ],
            productLocal: this.product,
            productFormSchema,
            selectedCategory: this.product.category_id,
            selectedSize: this.product.size,

        };
    },
    methods: {
        submitProduct() {
            this.product.category_id = this.selectedCategory;
            this.product.size = this.selectedSize;
            this.$emit("submit:product", this.productLocal);
        },

        saveImage(e) {
            this.productLocal.images = e.target.files;
        }
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
