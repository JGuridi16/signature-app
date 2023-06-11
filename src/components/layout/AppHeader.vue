<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
  <div class="container-fluid">
    <router-link class="navbar-brand" :to="{ name: 'home' }">
      <img :src="appLogo" alt="app-logo" />
    </router-link>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#burgerNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="burgerNavbar">
      <ul class="navbar-nav ms-5">
        <li class="nav-item">
          <router-link class="nav-link fw-bold" :to="{ name: 'signature' }">Firma Digital</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<script setup>
import { computed } from "vue";
import { getStaticImage } from '@/utils/utilities';

const appLogo = computed(() => getStaticImage('assets/images/ferries_caribe_logo.png'));
</script>
<style scoped>

</style>