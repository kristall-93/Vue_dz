<script setup>
import { computed } from "vue";
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

</script>

<template>
  <div class="col mb-5">
    <div class="card h-100">
      <!-- Product image-->
      <img class="card-img-top" :src="product.image" :alt="product.title" />
      <!-- Product details-->
      <div class="card-body p-4">
        <div class="text-center">
          <!-- Product name-->
          <h5 class="fw-bolder">{{ product.title }}</h5>
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
      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center">
          <a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a>
        </div>
      </div>
    </div>
  </div>
</template>
