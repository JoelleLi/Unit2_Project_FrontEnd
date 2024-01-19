<script setup>
import { ref, onMounted } from "vue"
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
    console.log(userData)

    console.log(userData.email)
    userEmail.value = userData.email

   }
}

onMounted(() => {
  fetchData()
  checkSession()
})

</script>

<template>
  <NewListing v-if="isLoggedIn" :fetchData="fetchData" :userEmail="userEmail"/>
  <div v-if="!isLoggedIn">Sign in to create a new listing</div>
</template>
