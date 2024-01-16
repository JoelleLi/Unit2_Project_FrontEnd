<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

import { useCookies } from "vue3-cookies"
import { decodeCredential } from "vue3-google-login"
const { cookies } = useCookies()


const router = useRouter()

const listing = ref({})
const listingsBe = ref([])
const isLoggedIn = ref(false)
const userEmail = ref("")
let userName = ""
const isCreator = ref(false)
const listingImage = ref(false)
const listingImages = ref(false)


onMounted(() => {
    checkSession()
    const route = useRoute()

    fetch(`${import.meta.env.VITE_API_URL}/listings/${route.params.id}`)

    .then(response => response.json())
    .then( result => {
        listing.value = result
        console.log(listing.value.image)
        checkImage()

        checkCreator()
        console.log(listing.value)

    })
    .catch(err => console.error(err))
})

function deleteListing(listingId) {
  fetch(`${import.meta.env.VITE_API_URL}/listings/${listingId}`, {
        method: "DELETE"
    })
    .then(() => {
        alert("Listing deleted")
        fetchData()
    })
    .then(() => {
        router.replace({ name: "listings" })
    })
    .catch(err => console.error(err))
}

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/listings"`)
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

const checkImage = () => {
    listingImage.value = listing.value.image
    listingImages.value = listing.value.images
}

const checkCreator = () => {
    const userData = decodeCredential(cookies.get("user_session"))
    isCreator.value = userData.email === listing.value.user.userEmail
    console.log(listing.value.user.userEmail)
}

</script>

<template>
    <h1>{{ listing.name }}</h1>
    <h4>{{ listing.location }}</h4>
    <!-- <img v-if="listingImage" :src="listingImage" alt="Listing Image" width="500"/> -->
    <img v-if="listingImage" :src="listing.image" :alt="listingImage" width="300px">
    <div class="imageGallery">
        <h3>Image Gallery</h3>
        <div v-for="(image, index) in listing.images" :key="index">
        <img :src="image" :alt="`Image ${index + 1}`" width="300px">
    </div>
    </div>
    <div v-if="isCreator">
        <RouterLink :to="'/listings/update/' + listing._id">Edit Listing</RouterLink>
    </div>
    <button v-if="isCreator" @click="deleteListing(listing._id)">Delete Listing</button> &nbsp; 
    <div>
        <iframe
      :src="`https://maps.google.com/maps?output=embed&q=${listing.address}`"
      width="500"
      height="400"
    ></iframe>
    </div>
</template>
