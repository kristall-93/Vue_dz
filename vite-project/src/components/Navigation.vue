<script setup>
import { ref } from "vue";

const toggle = ref(false);

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <button
        :class="toggle ? '' : 'collapsed'"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toggle = !toggle"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div 
        :class="toggle ? 'show' : ''"      
      class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'home' }"
              >Главная</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'add_product' }"
              >Добавление товара</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'cart' }"
              >Корзина</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'order' }"
              >Оформить заказ</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
