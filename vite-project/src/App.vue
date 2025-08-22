<template>
  <Navigation></Navigation>
  <router-view/>
</template>

<script setup>
import Navigation from "./components/Navigation.vue";
</script>

<style>
.router-link-active {
  color: red !important;
}
</style>
