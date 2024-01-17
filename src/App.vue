<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>


<template>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<link rel="stylesheet" href="./assets/main.css">
<header>
    <div class="wrapper">
      <nav class="navbar">
        <RouterLink to="/login" class="Login">Login</RouterLink>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/categories">Search By Category</RouterLink>
        <RouterLink to="/listings">All Listings</RouterLink>
        <RouterLink to="/mylistings">My Listings</RouterLink>
      </nav>
    </div>
    <!-- <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">Dropdown Example
    <span class="caret"></span></button>
    <ul class="dropdown-menu">
      <li><a href="#">HTML</a></li>
      <li><a href="#">CSS</a></li>
      <li><a href="#">JavaScript</a></li>
    </ul>
  </div> -->
</header>
  <RouterView />
</template>





