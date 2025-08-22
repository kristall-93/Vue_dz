<script setup>
import { ref, computed } from "vue";
const props = defineProps(["product"]);

const countFullStars = computed(() => {
  return Math.floor(props.product.rating.rate);
});

const fractionalPart = computed(() => {
  return Number((props.product.rating.rate % 1).toFixed(3));
});

const hasHalfStar = computed(() => {
  return fractionalPart.value >= 0.25 && fractionalPart.value < 1;
});

const countEmptyStars = computed(() => {
  return 5 - countFullStars.value - (hasHalfStar.value ? 1 : 0);
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
  <div class="col mb-5">
    <router-link
      class="card h-100"
      :to="{ name: 'product', params: { productId: product.id } }"
    >
      <!-- Product image-->
      <img class="card-img-top" :src="product.image" :alt="product.title" />
      <!-- Product details-->
      <div class="card-body text-dark">
        <div class="text-center">
          <!-- Product name-->
          <h5 class="fw-bolder">{{ product.title }}</h5>
          <p>{{ product.id }}</p>
          <!-- Product reviews-->
          <div class="d-flex justify-content-center small text-warning mb-2">
            <span hidden>{{ product.rating.rate }}</span>
            <div
              v-for="n in countFullStars"
              :key="n"
              class="bi-star-fill"
            ></div>
            <div v-if="hasHalfStar" class="bi-star-half"></div>
            <div v-for="n in countEmptyStars" :key="n" class="bi-star"></div>
          </div>
          <!-- Product price-->
          $ {{ product.price }}
        </div>
      </div>
      <!-- Product actions-->
      <div class="card-footer border-top-0 bg-transparent">
        <div class="text-center">
          <button class="btn btn-outline-dark mt-auto" @click.stop.prevent="addToCart(product)">Добавить в корзину</button>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.card:hover .card-body {
  color: #646cff !important;
}
.card-body {
  transition: 0.3s;
}
</style>
