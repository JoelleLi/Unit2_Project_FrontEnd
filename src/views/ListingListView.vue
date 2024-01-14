<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"
import NewListing from "@/components/NewListing.vue"
import { useCookies } from "vue3-cookies"
import { decodeCredential } from "vue3-google-login"
const { cookies } = useCookies()

const isLoggedIn = ref(false)
let userName = ""

const listingsBe = ref([])

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/listings`)
    .then( response => response.json() )
    .then( result => {
        listingsBe.value = result
    } )
}

function deleteListing(listingId) {
  fetch(`${import.meta.env.VITE_API_URL}/listings/${listingId}`, {
        method: "DELETE"
    })
    .then(() => {
        alert("Listing deleted")
        fetchData()
    })
    .catch(err => console.error(err))
}

const checkSession = () => {
   if( cookies.isKey("user_session") ) {
       isLoggedIn.value = true
       const userData = decodeCredential(cookies.get("user_session"))
       userName = userData.given_name
   }
}

onMounted(() => {
  fetchData()
  checkSession()
})

</script>

<template>
  <h1>All Listings</h1>
  <ul>
    <li v-for="listing in listingsBe" :key="listing._id">
      <RouterLink :to="'/listings/' + listing._id">{{ listing.name }}</RouterLink> &nbsp;
      <button @click="deleteListing(listing._id)">Delete Listing</button> &nbsp; 
      <RouterLink :to="'/listings/update/' + listing._id">Edit Listing</RouterLink>
    </li>
  </ul>
  <hr>
  <NewListing :fetchData="fetchData"/>
  <!-- <NewListing v-if="isLoggedIn" :fetchData="fetchData"/> -->
</template>
