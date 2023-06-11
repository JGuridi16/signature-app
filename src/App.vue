<template>
  <div class="app-wrapper">
    <app-header />
    <div class="h-100">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { AppHeader } from '@/components/layout'
</script>

<style scoped>
</style>
