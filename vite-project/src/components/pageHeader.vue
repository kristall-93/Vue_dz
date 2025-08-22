<script setup>
import { ref } from "vue";

defineProps(["results"]);

const searchText = ref("");

{
  /* const results = ref(['sdfs', 'sdcfs']) */
}
</script>

<template>
  <div class="container">
    <header class="py-3 mb-3 border-bottom">
      <div class="d-flex align-items-center gap-5">
        <img class="mr-5" src="/vue.svg" alt="logo" />
        <div className="form-wrapper">
          <form class="w-100 me-3" role="search">
            <input
              type="search"
              class="form-control"
              placeholder="Поиск..."
              aria-label="Search"
              v-model="searchText"
              @input.trim="$emit('setSearch', $event.target.value)"
            />
          </form>
          <div v-if="searchText" class="search-results dropdown-menu px-4">
            <div
              v-for="(result, index) in results"
              :key="index"
              class="search-results-item"
            >
              <router-link class="py-2 d-block" :to="{ name: 'product', params: { productId: result.id } }">{{ result.title }}</router-link>
            </div>
            <div v-if="!results.length" class="search-results-item">
              Нет результатов
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped>
.form-wrapper {
  position: relative;
  max-width: 600px;
  width: 100%;
}
form {
  max-width: 600px;
  width: 100%;
}
.search-results {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
}
.search-results-item {
}
</style>
