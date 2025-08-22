<script setup>
import { ref } from "vue";
const emit = defineEmits(["searchProduct"]);

const text = ref("");
const price = ref("");

function submitHandler(e) {
  e.preventDefault();
  emit("searchProduct", text.value, price.value);
}

function resetHandler(e) {
  text.value = "";
  price.value = "";
  submitHandler(e);
}
</script>

<template>
  <h2 class="mb-4">Поиск товаров:</h2>
  <form
    class="w-100 me-3 d-flex align-items-center gap-2"
    @submit="submitHandler"
  >
    <input
      type="text"
      class="form-control"
      placeholder="Введите название..."
      v-model="text"
    />
    <input
      type="text"
      class="form-control"
      placeholder="Введите цену..."
      v-model="price"
    />
    <button class="btn btn-primary" type="submit">Применить</button>
    <button class="btn btn-secondary" type="button" @click="resetHandler">
      Сбросить
    </button>
  </form>
</template>

<style scoped>
form {
  max-width: 700px;
}
</style>
