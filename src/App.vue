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

    // const myListingsLink = document.getElementById("mylistings-link")
    // myListingsLink.classList = "nav-link"

    const logOutLink = document.getElementById("login")
    logOutLink.innerText = "log out"
    console.log(logOutLink)
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
  <div class="row" id="header-bar">
  </div>
  <div class="row">
    <div class="col-md-2" id="nav-wrapper">
      <div class="nav-wrapper2">
        <div id="icon-wrapper" class="col-2">
          <img id="icon" src="./assets/images/shootfinder.png" alt="shootfinder logo">
        </div>
        <nav class="navbar flex-column">
          <a class="nav-link">
            <RouterLink to="/" class="nav-text">home</RouterLink>
          </a> 
          <a class="nav-link">
            <RouterLink to="/categories" class="nav-text">categories</RouterLink>
          </a> 
          <a class="nav-link">
            <RouterLink to="/listings" class="nav-text">all listings</RouterLink>
          </a> 
          <a class="nav-link" id="mylistings-link">
            <RouterLink to="/mylistings" class="nav-text">my listings</RouterLink>
          </a> 
          <a class="nav-link" id="newlisting-link">
            <RouterLink to="/newlisting" class="nav-text">new listing</RouterLink>
          </a> 
        </nav> 
      </div>
    </div>
    <div class="col-md-10 d-flex flex-column" id="main-content-wrapper">
      <div class="w-100 d-block" id="header-bar-wrapper">
        <RouterLink to="/login" id="login">login</RouterLink>
      </div>
      <div>
          <RouterView />
      </div>
    </div>
  </div>
</div>
    <div class="wrapper">
    </div>
</header>
</template>





