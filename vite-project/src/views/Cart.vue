<script setup>
import { ref, computed } from "vue";

import pageHeader from "./../components/pageHeader.vue";

const searchText = ref("");
const searchResults = ref([]);

function setSearchHandler(text) {
  searchText.value = text;
}

const cart = ref(JSON.parse(localStorage.getItem("cart")));

function clearCart() {
  localStorage.removeItem("cart");
  cart.value = [];
}

const summaryCart = computed(() => {
  let summary = 0;
  cart.value.forEach((item) => (summary += item.price * item.count));
  return Math.round(summary * 100) / 100;
});

// Функции для управления количеством товара
function increaseQuantity(itemId) {
  const item = cart.value.find(item => item.id === itemId);
  if (item) {
    item.count += 1;
    updateCartInStorage();
  }
}

function decreaseQuantity(itemId) {
  const item = cart.value.find(item => item.id === itemId);
  if (item && item.count > 1) {
    item.count -= 1;
    updateCartInStorage();
  }
}

function updateQuantity(itemId, newQuantity) {
  const item = cart.value.find(item => item.id === itemId);
  if (item) {
    const quantity = parseInt(newQuantity);
    if (quantity >= 1) {
      item.count = quantity;
      updateCartInStorage();
    }
  }
}

function updateCartInStorage() {
  localStorage.setItem("cart", JSON.stringify(cart.value));
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
        <h1 class="text-center pb-5">Корзина</h1>

        <div class="container py-5">
          <template v-if="cart && cart.length > 0">
            <div class="row">
              <div class="col-lg-8">
                <!-- Cart Items -->
                <div class="card mb-4">
                  <div class="card-body">
                    <div class="row cart-item mb-3 py-3">
                      <div class="col-md-7">
                        <h5 class="card-title">Товар</h5>
                      </div>
                      <div class="col-md-1 text-end">
                        <p class="fw-bold">Кол-во</p>
                      </div>
                      <div class="col-md-2 text-end">
                        <p class="fw-bold">Цена</p>
                      </div>
                      <div class="col-md-2 text-end">
                        <p class="fw-bold">Сумма</p>
                      </div>
                    </div>

                    <div
                      v-for="item in cart"
                      :key="item.id"
                      class="row cart-item mb-3 py-3"
                      data-testid="item"
                    >
                      <div class="col-md-2">
                        <img
                          :src="item.image"
                          :alt="item.title"
                          class="img-fluid"
                        />
                      </div>
                      <div class="col-md-4">
                        <router-link class="link"
                          :to="{
                            name: 'product',
                            params: { productId: item.id },
                          }"
                        >
                          <h5 class="card-title">{{ item.title }}</h5>
                        </router-link>
                      </div>
                      <div class="col-md-2">
                        <div class="input-group">
                          <button 
                            class="btn btn-outline-secondary btn-sm" 
                            type="button"
                            @click="decreaseQuantity(item.id)"
                            :disabled="item.count <= 1"
                            data-testid="minus"
                          >
                            -
                          </button>
                          <input 
                            style="max-width:100px" 
                            type="number" 
                            class="form-control form-control-sm text-center quantity-input" 
                            :value="item.count"
                            @input="updateQuantity(item.id, $event.target.value)"
                            min="1"
                            data-testid="count"
                          >
                          <button 
                            class="btn btn-outline-secondary btn-sm" 
                            type="button"
                            @click="increaseQuantity(item.id)"
                            data-testid="plus"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div class="col-md-2 text-end">
                        <p class="fw-bold">${{ item.price }}</p>
                      </div>
                      <div class="col-md-2 text-end">
                        <p class="fw-bold">${{ item.price * item.count }}</p>
                      </div>
                    </div>

                    <hr v-if="cart && cart.length > 0" class="my-5" />

                    <button
                      v-if="cart && cart.length > 0"
                      class="btn btn-sm btn-outline-danger d-flex align-items-center gap-2 mt-5"
                      @click="clearCart"
                    >
                      <span>Очистить корзину</span>
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <!-- Cart Summary -->
                <div class="card cart-summary">
                  <div class="card-body">
                    <div class="d-flex justify-content-between mb-4">
                      <strong>Сумма заказа</strong>
                      <strong data-testid="summary">${{ summaryCart }}</strong>
                    </div>
                    <router-link class="btn btn-primary w-100" to="/order">
                      Оформить заказ
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-else>
            <h2 class="fw-bold text-center font-sm">Корзина пуста</h2>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.card {
  padding: 2em 1em;
}
.cart-item img {
  max-width: 100px;
  height: auto;
  max-height: 100px;
}
.link {
color: inherit;}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.quantity-input[type=number] {
  -moz-appearance: textfield;
}
</style>
