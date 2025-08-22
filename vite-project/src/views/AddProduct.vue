<script setup>
import { ref } from "vue";

import pageHeader from "./../components/pageHeader.vue";
import orderSection from "./../components/orderSection.vue";
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
        <h1 class="text-center pb-5">Добавление товара</h1>

        <!-- эту форму не прорабатывала, тут страница ради страницы, в рамках ДЗ -->

        <form class="row g-3">
          <div class="mb-5">
            <label for="title" class="form-label">Название</label>
            <input
              type="text"
              class="form-control"
              id="title"
              name="title"
              placeholder="название"
            />
          </div>
          <div class="mb-5">
            <button class="btn btn-lg btn-primary w-auto" type="submit">
              Добавить товар
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
