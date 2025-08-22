<script setup>
import { ref, onBeforeMount } from "vue";

import pageHeader from "./../components/pageHeader.vue";
const props = defineProps(["productId"]);

const searchText = ref("");
const searchResults = ref({});
const product = ref({});

function setSearchHandler(text) {
  searchText.value = text;
}

onBeforeMount(() => {
  // console.log("onBeforeMount");
  fetch(`https://fakestoreapi.com/products/${props.productId}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      product.value = data;
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });
});

const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart.value));
}

function addToCart(product) {
  const item = cart.value.find(item => item.id === product.id);
  
  if (item) {
    item.count += 1;
  } else {
    cart.value.push({ ...product, count: 1 });
  }

  saveCart();
}
</script>

<template>
  <div>
    <page-header
      @setSearch="setSearchHandler"
      :results="searchResults"
    ></page-header>
    <section class="py-5">
      <div class="container">
        <div class="container mt-5">
          <div class="row">
            <!-- Product Images -->
            <div class="col-md-6 mb-4">
              <img
                :src="product.image"
                alt="Product"
                class="img-fluid rounded mb-3 product-image"
                id="mainImage"
              />
            </div>

            <!-- Product Details -->
            <div class="col-md-6">
              <h1 class="mb-5">{{ product.title }}</h1>
              <div class="mb-3">
                <span class="h4 me-2">${{ product.price }}</span>
              </div>
              <p class="mb-4">
                {{ product.description }}
              </p>
              <button
                class="btn btn-primary btn-lg mb-3 me-2 d-flex gap-2"
                @click="addToCart(product)"
              >
                <i class="bi bi-cart-plus"></i>Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.product-image {
  max-height: 400px;
  object-fit: cover;
}
.thumbnail {
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}
.thumbnail:hover,
.thumbnail.active {
  opacity: 1;
}
</style>
