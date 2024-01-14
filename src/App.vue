<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/listings">All Listings</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>