<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import productsItem from "./productsItem.vue";

const { search, searchStartText, searchStartPrice } = defineProps([
  "search",
  "searchStartText",
  "searchStartPrice",
]);

const emit = defineEmits();

const products = ref([]);

const loading = ref(true);

const productsFiltered = computed(() => {
  if (!search) return products.value;
  return products.value.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
});

const productsFilteredSearch = computed(() => {
  if (!searchStartText && !searchStartPrice) return products.value;
  return products.value.filter(
    (product) =>
      product.title.toLowerCase().includes(searchStartText.toLowerCase()) &&
      product.price.toString().includes(searchStartPrice)
  );
});

watch(
  productsFiltered,
  (newValue) => {
    emit("productsFiltered", newValue);
  },
  { immediate: true }
);

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
    <div class="container">
      <div class="py-5 text-center">
        <h2 class="h2">Список товаров</h2>
      </div>
      <div v-if="loading">Загрузка...</div>
      <div
        v-if="!loading"
        class="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <products-item
          v-for="product in productsFilteredSearch"
          :key="product.id"
          :product="product"
        ></products-item>
        <div v-if="!productsFilteredSearch.length">
          Нет товаров, соответствующих запросу
        </div>
      </div>
    </div>
  </section>
</template>
