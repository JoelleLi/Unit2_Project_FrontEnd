<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

import { useCookies } from "vue3-cookies"
import { decodeCredential } from "vue3-google-login"
import "./SingleListing.css"
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
        router.push("/mylistings")
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
}

const checkPublicOrPrivate = () => {
    isPublic.value = listing.value.public
    isPrivate.value = listing.value.private
}

</script>

<template>
    <div class="container d-inline-flex flex-column">
        <h4 class="mt-3">{{ listing.name }}</h4>
        <!-- <h6 class="mb-3">{{ listing.city }}</h6> -->
        <div class="d-flex flex-wrap align-items-center mt-1 mb-3">
            <RouterLink class="links" :to="'/categories/city/' + listing.city">
            <span class="badge rounded-pill text-bg-light cityButton">{{ listing.city }}</span>
            </RouterLink>
        </div>

        <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
                <div v-for="(image, index) in listing.images" :key="index" class="carousel-item">
                    <img :src="image" :alt="`Image ${index + 1}`" class="d-block w-100">
                </div>
                <div class="carousel-item active">
                    <img :src="listing.image" class="d-block w-100" :alt="listing.name">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon bg-primary rounded-pill" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon bg-primary rounded-pill" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div class="d-flex flex-column align-items-center">
            <span class="badge rounded-pill text-bg-primary mt-2 mb-2" v-if="isPublic && isPrivate">Public & Private Listing</span>
            <span class="badge rounded-pill text-bg-primary mt-2 mb-2" v-if="isPrivate && !isPublic">Private Listing</span>
            <span class="badge rounded-pill text-bg-primary mt-2 mb-2" v-if="isPublic && !isPrivate">Public Listing</span>
        </div>

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

        <div class="container d-flex align-items-center justify-content-center">
            <iframe
            :src="`https://maps.google.com/maps?output=embed&q=${listing.address}`"
            ></iframe>
        </div>

        <hr>

        <h5 class="mt-1 mb-2">User Image Gallery</h5>

        <!-- <div id="userImages" class="d-flex flex-wrap align-items-center">
            <div v-for="(image, index) in listing.images" :key="index" >
                <img :src="image" :alt="`Image ${index + 1}`" class="img-fluid">
            </div>
        </div> -->
        <div v-if="isLoggedIn">
            <RouterLink :to="'/listings/' + listing._id + '/photos/'">
                <span class="badge rounded-pill text-bg-success mb-3 addListing">+ Add Your Images</span>
            </RouterLink> &nbsp; 
        </div>

        <div id="userImages" class="d-flex flex-wrap align-items-center justify-content-center">
            <div v-for="(photoGroup, groupIndex) in listing.photos" :key="groupIndex">
                <div v-for="(photo, photoIndex) in photoGroup.photos" :key="photoIndex">
                    <img :src="photo" :alt="`Photo ${groupIndex + 1}-${photoIndex + 1}`" width="300px">
                </div>
            </div>
        </div>


        <div v-if="isCreator" class="mt-4 mb-5">
            <RouterLink :to="'/listings/update/' + listing._id">
                <span class="badge rounded-pill text-bg-success mb-3 addListing">Edit Listing</span>
            </RouterLink>
            <div>
                <RouterLink :to="'/listings/delete/' + listing._id">
                    <span class="badge rounded-pill text-bg-danger mb-3 addListing" @click="deleteListing(listing._id)">Delete Listing</span>
                </RouterLink>
            </div>

        </div>


    </div>


</template>
