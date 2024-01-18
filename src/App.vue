<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from "vue"
import { useCookies } from "vue3-cookies"
import { decodeCredential } from "vue3-google-login"
const { cookies } = useCookies()

const isLoggedIn = ref(false)
let userName = ""
const userEmail = ref("")

const checkSession = () => {
  if( cookies.isKey("user_session") ) {
    isLoggedIn.value = true
    const userData = decodeCredential(cookies.get("user_session"))
    userName = userData.given_name
    console.log(userData)

    console.log(userData.email)

    userEmail.value = userData.email
   }
}

onMounted(checkSession)

</script>

<template>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<link rel="stylesheet" href="./assets/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unna&display=swap" rel="stylesheet">
<header>

<div class="container">
  <div class="row">
    <div class="col-12">
      <h1>heading</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-md-3">
      <H1>TEST</H1>
    </div>
    <div class="col-md-9">
      <H1>TEST</H1>
    </div>
  </div>
</div>

    <div class="wrapper">
      <nav class="navbar">
        <RouterLink to="/login" class="Login">Login</RouterLink>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/categories">Categories</RouterLink>
        <RouterLink to="/listings">All Listings</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/mylistings">My Listings</RouterLink>
      </nav>
    </div>
</header>
  <RouterView />
</template>





