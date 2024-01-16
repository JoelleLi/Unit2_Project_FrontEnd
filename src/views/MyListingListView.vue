<script setup>
import { ref, onMounted } from "vue"
import { useRoute, RouterLink } from "vue-router"
import NewListing from "@/components/NewListing.vue"
import { useCookies } from "vue3-cookies"
import { decodeCredential } from "vue3-google-login"
const { cookies } = useCookies()

// const listing = ref({})
const listing = ref({})
const isLoggedIn = ref(false)
let userName = ""
const user = ref("")
const userEmail = ref("")
const listingsBe = ref([])
// let isCreator = ref(false)
// const listingImage = ref(false)

onMounted(() => {
    checkSession()

    fetch(`${import.meta.env.VITE_API_URL}/listings/mylistings/${userEmail.value}`)
    // fetch(`${import.meta.env.VITE_API_URL}/listings/${route.params.id}`)

    .then( response => response.json() )
    .then( result => {
        // listing.value = result
        listingsBe.value = result
        // checkCreator()
    })
    .catch(err => console.error(err))
})

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/listings`)
    // fetch(`${import.meta.env.VITE_API_URL}/listings/${route.params.id}`)

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

// const checkCreator = () => {
//     const userData = decodeCredential(cookies.get("user_session"))
//     for (let i = 0; i < listingsBe.value.length; i++) {
//         console.log(listingsBe.value[i])
//         listingsBe.value[i] = listing
//         console.log(listing)
//         console.log(listingsBe.value[i].user)
//         console.log(userData.user)
//         // if (userData.user === listingsBe.value[i].user) {
//         // console.log("true")
//         // isCreator.value = true
//         // } else {
//         // console.log("false")
//         // isCreator.value = false
//         // }
//     }
// }

</script>

<template>
  <h1>My Listings</h1>
  <ul>
    <li v-for="listing in listingsBe" :key="listing._id">
      <RouterLink :to="'/listings/' + listing._id">{{ listing.name }}</RouterLink> &nbsp;
    </li>
  </ul>
  <hr>
  <NewListing v-if="isLoggedIn" :fetchData="fetchData" :userEmail="userEmail"/></template>
