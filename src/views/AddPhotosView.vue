<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { useCookies } from "vue3-cookies"
import { decodeCredential } from "vue3-google-login"
const { cookies } = useCookies()

const listing = ref({})
const listingsBe = ref({})
const userEmail = ref("")
let userName = ""

const router = useRouter()

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
    .then(() => {
        router.push(`/listings/${listing.value._id}`);
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

    userEmail.value = userData.email
   }
}

</script>

<template>
    <h5 class="mt-3 mb-3">Add your photos for <strong>{{ listing.name }}</strong></h5>


    <label  class="form-label" for="images">Image URLs *</label>

    <div v-for="(photo, index) in photos.photos" :key="index" class="row g-3 mb-1">
        <div class="col-auto">
            <input type="text" :name="'image-' + index" v-model="photos.photos[index]" 
            class="form-control" placeholder="Image URL" required>
        </div>
        <div class="col-auto">
            <button type="button" @click="removeImage(index)" class="btn btn-light"
            >Remove</button>
        </div>
        <div class="col-auto">
            <button class="btn btn-light" type="button" @click="addImage">Add Image</button>
        </div>


    </div>

    <button class="btn btn-primary mt-3 mb-5" @click="addPhotos">Add Photos</button>
    
</template>