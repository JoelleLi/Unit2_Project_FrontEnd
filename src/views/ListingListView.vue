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

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/listings`)
    .then( response => response.json() )
    .then( result => {
        listingsBe.value = result
    } )
}

const checkSession = () => {
  if( cookies.isKey("user_session") ) {
    isLoggedIn.value = true
    const userData = decodeCredential(cookies.get("user_session"))
    userName = userData.given_name
    // console.log(userData)

    // console.log(userData.email)
    userEmail.value = userData.email

  }
}

onMounted(() => {
  fetchData()
  checkSession()
})

</script>

<template>
  <div class="mainlistings-wrapper">
    <h3>All Listings</h3>
    <div class="grid-wrapper-mainlistings">
      <div v-for="listing in listingsBe" :key="listing._id">
        <RouterLink :to="'/listings/' + listing._id">
          <div class="listing-container">
            <div class="listing-image-wrapper">
              <img class="listing-image" :src="listing.image" :alt="listing.name + ' Image'" width="200" />
            </div>
            <div class="listing-details">
              <span class="listing-details">
                {{ listing.name }}
              </span>
            </div>
          </div>
        </RouterLink> &nbsp;
      </div>
    </div>
  </div>
  <hr>
  <NewListing v-if="isLoggedIn" :fetchData="fetchData" :userEmail="userEmail"/>
</template>
