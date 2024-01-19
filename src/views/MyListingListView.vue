<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"
import NewListing from "@/components/NewListing.vue"
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
        console.log(listingsBe.value)
          listingsBe.value = result
          console.log(userEmail.value)
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
    console.log(userData)

    console.log(userData.email)

    userEmail.value = userData.email
   }
}

</script>

<template>
  <div v-if="!isLoggedIn">Sign in to view your listings</div>
  <div class="mylistings-wrapper">
    <h3>My Listings</h3>
    <div v-if="isLoggedIn" class="grid-wrapper-mylistings">
      <div v-for="listing in listingsBe" :key="listing._id">
        <RouterLink :to="'/listings/' + listing._id">
          <div class="listing-container">
            <div class="listing-image-wrapper">
              <img class="listing-image" :src="listing.image" :alt="listing.name + ' Image'" width="250" height="250" />
            </div>
            <div>
              <span class="listing-details-mylistings">{{ listing.name }}</span>
            </div>
          </div>
        </RouterLink> &nbsp;
      </div>
    </div>
  </div>

  <hr>
  <NewListing v-if="isLoggedIn" :fetchData="fetchData" :userEmail="userEmail"/></template>
