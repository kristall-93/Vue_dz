<script setup>
import { ref } from "vue";

import pageHeader from "./../components/pageHeader.vue";
import searchBlock from "./../components/searchBlock.vue";
import productsSection from "./../components/productsSection.vue";

const searchText = ref("");
const searchStartText = ref("");
const searchStartPrice = ref("");
const searchResults = ref([]);

function setSearchHandler(text) {
  searchText.value = text;
}
function searchStartHandler(text, price) {
  searchStartText.value = text;
  searchStartPrice.value = price;
}
function productsFilteredHandler(products) {
  searchResults.value = products;
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
        <h1 class="text-center pb-5">Главная</h1>

        <search-block @searchProduct="searchStartHandler"></search-block>
      </div>
    </section>

    <products-section
      :search="searchText"
      :searchStartText="searchStartText"
      :searchStartPrice="searchStartPrice"
      @productsFiltered="productsFilteredHandler"
    ></products-section>

  </div>
</template>
