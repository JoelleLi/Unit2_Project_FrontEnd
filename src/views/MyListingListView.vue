<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"
import NewListing from "@/components/NewListing.vue"
import LoginMessage from "@/components/LoginMessage.vue"
import { useCookies } from "vue3-cookies"
import { decodeCredential } from "vue3-google-login"
const { cookies } = useCookies()

const isLoggedIn = ref(false)
let userName = ""
const userEmail = ref("")
const listingsBe = ref([])

onMounted(() => {
    checkSession()
    if (isLoggedIn.value === true) {
      fetch(`${import.meta.env.VITE_API_URL}/listings/mylistings/${userEmail.value}`)

      .then( response => response.json() )
      .then( result => {
        listingsBe.value = result
      })
      .catch(err => console.error(err))
    } else {
      return
    }
})

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/listings`)

    .then( response => response.json() )
    .then( result => {
        // listing.value = result
        listingsBe.value = result
    })
}

const checkSession = () => {
  if( cookies.isKey("user_session") ) {
    isLoggedIn.value = true
    const userData = decodeCredential(cookies.get("user_session"))
    userName = userData.given_name


    userEmail.value = userData.email
   }
}

</script>

<template>
  <div v-if="!isLoggedIn">
    <LoginMessage />
    <hr>
  </div>
  <RouterLink to="/newlisting" class="text-primary-emphasis">
    <span class="badge rounded-pill text-bg-success mt-3 mb-3 addListing">+ Add New Listing</span>
  </RouterLink>

  <h4 class="mb-3">My Listings</h4>

  <div v-if="!isLoggedIn">
    <RouterLink to="/login" class="text-primary-emphasis">
      Log in
    </RouterLink>
     to view your listings.
  </div>

  <div v-if="isLoggedIn" class="grid-wrapper-mainlistings">
    <div v-for="listing in listingsBe" :key="listing._id">
      <RouterLink :to="'/listings/' + listing._id">
        <div class="card border-0">
          <img :src="listing.image" class="card-img-top" :alt="listing.name"/>
          <div class="card-body">
            <p class="card-text">{{ listing.name }}</p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>

  </template>
