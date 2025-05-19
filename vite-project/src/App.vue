<template>
  <div>
    <button @click="listVisible = !listVisible">
      {{ listVisible === true ? "Скрыть" : "Показать" }} список
    </button>
    <ul v-if="listVisible">
      <li v-for="user in users" :key="user.id">
        <b>{{ user.name }}</b>
        <span
          class="show_btn"
          :class="{ colored: user.colored }"
          @click="user.ageVisible = !user.ageVisible"
          @mouseover="user.colored = true"
          @mouseleave="user.colored = false"
        >
          {{ user.ageVisible === true ? "Скрыть" : "Показать..." }}
        </span>
        <span v-show="user.ageVisible"> age = {{ user.age }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const listVisible = ref(false);

const users = ref([
  {
    id: 1,
    name: "John",
    age: 20,
    ageVisible: false,
    colored: false,
  },
  {
    id: 2,
    name: "Kate",
    age: 25,
    ageVisible: false,
    colored: false,
  },
  {
    id: 3,
    name: "Joe",
    age: 40,
    ageVisible: false,
    colored: false,
  },
]);
</script>

<style scoped>
ul li {
  transition: 0.3s;
}
ul li span {
  margin-left: 20px;
}
.show_btn {
  cursor: pointer;
}
.colored {
  color: orange;
}
</style>
