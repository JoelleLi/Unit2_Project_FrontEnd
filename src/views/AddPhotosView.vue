<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from "vue-router"
import { useCookies } from "vue3-cookies"
import { decodeCredential } from "vue3-google-login"
const { cookies } = useCookies()

const listing = ref({})
const listingsBe = ref({})
const userEmail = ref("")
let userName = ""

const photos = ref({
    photos: [""],
    userEmail: userEmail
})

onMounted(() => {
    checkSession()
    const route = useRoute()

    fetch(`${import.meta.env.VITE_API_URL}/listings/${route.params.id}`)
    

    .then(response => response.json())
    .then( result => {
        listing.value = result
    })
    .catch(err => console.error(err))
})

const addImage = () => {
  photos.value.photos.push(''); // Add a new empty string for a new image
};

const removeImage = (index) => {
  photos.value.photos.splice(index, 1); // Remove the image at the specified index
};

function addPhotos(e) {
    e.preventDefault()
    console.log(`${import.meta.env.VITE_API_URL}/listings/${listing.value._id}/photos/add`)

    photos.value.userEmail = userEmail

    fetch(`${import.meta.env.VITE_API_URL}/listings/${listing.value._id}/photos/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...photos.value, userEmail: userEmail.value })
    })
    .then(res => {
        photos.value = {
            photos: [""],
            userEmail: userEmail
        }
        console.log(res)

        fetchData()
        clearForm()
    })
    .catch(err => console.error(err))
}

function clearForm() {
    photos.value = {
        photos: [""],
        userEmail: userEmail
    }
}
const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/listings`)
    .then( response => response.json() )
    .then( result => {
        listingsBe.value = result
    } )
}

const checkSession = () => {
  if( cookies.isKey("user_session") ) {
    // isLoggedIn.value = true
    const userData = decodeCredential(cookies.get("user_session"))
    userName = userData.given_name
    console.log(userData)

    console.log(userData.email)

    userEmail.value = userData.email
   }
}

</script>

<template>
    <h1>Add your photos for {{ listing.name }}</h1>
    <div class="listingForm">

        <div class="image-form">
            <label for="images">Images URLs *</label>
            <div v-for="(photo, index) in photos.photos" :key="index">
                <input type="text" :name="'image-' + index" v-model="photos.photos[index]" placeholder="Image URL" required>
                <button type="button" @click="removeImage(index)">Remove</button>
            </div>
            <button type="button" @click="addImage">Add Image</button>
        </div>

    <button @click="addPhotos">Add Photos</button>
    </div>
</template>