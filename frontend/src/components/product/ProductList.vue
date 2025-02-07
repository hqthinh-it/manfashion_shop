<script>
export default {
    props: {
        products: { type: Array, default: [] },

    },
};
</script>
<template>
    <div class="row">
        <div class="col-md-3" v-for="product in products" :key="product._id">

            <div class="card-product card mt-5">
                <div class="card-header">
                    <small><b>
                            {{ product.productname }}</b>
                    </small>
                </div>
                <div class="card-item">

                    <div class="card-img">
                        <img :src="'http://localhost:8000/' + product.images[0].link" alt="">
                    </div>
                    <div class="card-img-slider">
                        <img :src="'http://localhost:8000/' + product.images[1].link" alt="">

                    </div>
                    <div class="card-img-slider-2">
                        <router-link :to="{
                            name: 'product.detail',
                            params: { id: product._id },
                        }">
                            <button class="card-button">
                                <small> <b>Chi tiết</b></small>
                            </button>
                        </router-link>
                    </div>
                </div>
                <div class="card-footer">
                    <router-link :to="{
                        name: 'product.detail',
                        params: { id: product._id },
                    }">
                        <button class="card-button">
                            <small> <b>Chi tiết</b></small>
                        </button>
                    </router-link>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.card-product {
    border-radius: 10px;
}

.card-button {
    width: 30%;
    float: right;
    border-radius: 5px;
    background-color: white;
}

.card-header {
    color: rgb(2, 101, 18);
    height: 50px;
}

.card-item {
    width: 100%;
    height: 450px;
    position: relative;
    overflow: hidden;
    border: 1px solid #ccc;
    cursor: pointer;
}

.card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;

}

.card-img-slider {
    width: 100%;
    height: 450px;
    transform: translateX(-100%);
    transition: all 0.7s ease;
    overflow: hidden;
    padding: 0px !important;
}


.card-img-slider-2 button{
    float: right;

}
.card-img-slider img {
    padding: 0px !important;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-item:hover .card-img-slider {
    transform: translateX(0%);
}
</style>
