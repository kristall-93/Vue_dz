<script setup>
import { ref, onBeforeMount } from "vue";
import productsItem from "./productsItem.vue";

const products = ref([]);
const loading = ref(true);

onBeforeMount(() => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      products.value = data;
      loading.value = false;
    })
    .catch((error) => {
      console.error("Ошибка при получении данных:", error);
    });
});
</script>

<template>
  <section class="py-5">
    <div class="container px-4 px-lg-5 mt-5">
      <div v-if="loading">Загрузка...</div>
      <div
        v-if="!loading"
        class="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <products-item
          v-for="product in products" :key="product.id"
          :product="product"
        ></products-item>
      </div>
    </div>
  </section>
</template>
