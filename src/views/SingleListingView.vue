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
const isPublic = ref(false)
const isPrivate = ref(false)
const listingImage = ref(false)
const listingImages = ref(false)
const photosId = ref("")

onMounted(() => {
    checkSession()
    const route = useRoute()

    fetch(`${import.meta.env.VITE_API_URL}/listings/${route.params.id}`)

    .then(response => response.json())
    .then( result => {
        listing.value = result
        checkImage()
        // checkPhoto()
        checkCreator()
        checkPublicOrPrivate()
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

// const checkPhoto = () => {
//     const photos = listing.value.photos[0].photos;
//     console.log(photos)

//     for (const photo of photos) {
//     console.log(photo)
//     console.log(listing.value.photos[0]._id)
//     const photosId = listing.value.photos[0]._id
//     console.log(photosId)
// }
// }

const checkCreator = () => {
    const userData = decodeCredential(cookies.get("user_session"))
    isCreator.value = userData.email === listing.value.user.userEmail
    console.log(listing.value.user.userEmail)
}

const checkPublicOrPrivate = () => {
    isPublic.value = listing.value.public
    isPrivate.value = listing.value.private
}

</script>

<template>
    <div class="container d-inline-flex flex-column">
        <h4 class="mt-3">{{ listing.name }}</h4>
        <h6 class="mb-3">{{ listing.city }}</h6>
        <img v-if="listingImage" :src="listing.image" :alt="listingImage" class="img-fluid">
        <span class="badge rounded-pill text-bg-primary mt-2 mb-2" v-if="isPublic && isPrivate">Public & Private Listing</span>
        <span class="badge rounded-pill text-bg-primary mt-2 mb-2" v-if="isPrivate && !isPublic">Private Listing</span>
        <span class="badge rounded-pill text-bg-primary mt-2 mb-2" v-if="isPublic && !isPrivate">Public Listing</span>


        <p class="listing-description mt-3">{{ listing.description }}</p>

        <div class="d-inline-flex flex-column">
            <div class="d-flex flex-wrap align-items-center">
                <span class="badge text-bg-light me-2">phone:</span>
                <span> {{ listing.telephone }}</span>
            </div>
            <div class="d-flex flex-wrap align-items-center">
                <span class="badge text-bg-light me-2">email:</span>
                <span> {{ listing.emailAddress }}</span>
            </div>
        </div>

        <hr>

        <h5 class="mt-3 mb-3">Image Gallery</h5>
        <div v-for="(image, index) in listing.images" :key="index">
            <img :src="image" :alt="`Image ${index + 1}`" width="300px">
        </div>

        <h5 class="mt-3 mb-3">User Image Gallery</h5>
        <div v-for="(photoGroup, groupIndex) in listing.photos" :key="groupIndex">
            <div v-for="(photo, photoIndex) in photoGroup.photos" :key="photoIndex">
                <img :src="photo" :alt="`Photo ${groupIndex + 1}-${photoIndex + 1}`" width="300px">
            </div>
        </div>

        <div id="button-wrapper">
            <button v-if="isCreator">
            <RouterLink class="button" :to="'/listings/update/' + listing._id">Edit Listing</RouterLink>
            </button>
            <button class="button" v-if="isCreator" @click="deleteListing(listing._id)">Delete Listing
            </button> &nbsp; 
        </div>
        <div v-if="isLoggedIn">
            <h3>
                <RouterLink id="editlink" :to="'/listings/' + listing._id + '/photos/'">Add Photos of Your Shoots</RouterLink> &nbsp; 
            </h3>
        </div>
        <div>
        <iframe
        :src="`https://maps.google.com/maps?output=embed&q=${listing.address}`"
        width="500"
        height="400"
        ></iframe>
        </div>
    </div>


</template>
