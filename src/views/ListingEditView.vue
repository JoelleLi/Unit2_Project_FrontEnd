<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const listingId = route.params.id
const userEmail = ref("")
const listingsBe = ref([])

const photoId = ref("")

const listing = ref({
    name: "",
    city: "",
    address: "",
    image: "",
    images: [""],
    photos: [""],
    public: "",
    private: "",
    contactInfo: "",
    description: "",
    _id: ""
})

const photos = ref({
    photos: [""],
    userEmail: userEmail
})

const LoadListingData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/listings/${listingId}`)
    .then(res => res.json())
    .then(data => {
        listing.value = {
            name: data.name,
            city: data.city,
            address: data.address,
            image: data.image,
            images: data.images || [],
            photos: data.photos || [],
            public: data.public,
            private: data.private,
            contactInfo: data.contactInfo,
            description: data.description,
            _id: data._id
        }
    })
}

const updateListing = () => {
    fetch(`${import.meta.env.VITE_API_URL}/listings/${listingId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(listing.value)
    })
    .then(() => {
        router.replace({ name: "listings" })
    })
    .catch(err => console.error(err))
}

function deletePhotos(groupIndex) {
    const photoIdToDelete = listing.value.photos[groupIndex]._id
    console.log(photoIdToDelete)
    fetch(`${import.meta.env.VITE_API_URL}/listings/${listing.value._id}/photos/${photoIdToDelete}`, {
        method: "DELETE"
    })
    .then(() => {
        alert("Photos deleted")
        fetchData()
    })
    .then(() => {
        router.replace("/mylistings")
    })
    .then(() => {
        window.location.reload()
    })
    .catch(err => console.error(err))
}

onMounted(LoadListingData)

const addImage = () => {
    listing.value.images.push('')
}

const removeImage = (index) => {
    listing.value.images.splice(index, 1)
}

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/listings`)
    .then( response => response.json() )
    .then( result => {
        listingsBe.value = result
    } )
}
</script>

<template>
    <h1>Edit {{ listing.name }}</h1>
    <div class="listingForm">
        <label for="name">Name: *</label>
        <input type="text" name="name" placeholder="Name" v-model="listing.name" required>
        
        <label for="location">City: *</label>
        <input type="text" name="city" placeholder="City" v-model="listing.city" required>
        
        <label for="address">Address: *</label>
        <input type="text" name="address" placeholder="Address" v-model="listing.address" required>

        <label for="public">Public?</label>
        <input type="checkbox" name="public" v-model="listing.public">

        <label for="private">Private?</label>
        <input type="checkbox" name="private" v-model="listing.private">

        <label for="telephone">Telephone: *</label>
        <input type="text" name="telephone" placeholder="Telephone" v-model="listing.telephone" required>
        
        <label for="email">Email: *</label>
        <input type="text" name="email" placeholder="Email" v-model="listing.emailAddress" required>

        <label for="description">Info: *</label>
        <input type="text" name="description" placeholder="Add description/ rates/ accessibility" v-model="listing.description" required>
        
        <label for="image">Image URL: *</label>
        <input type="text" name="image" placeholder="Image" v-model="listing.image" required>
        
        <label for="images">Images URLs:</label>
        <div v-for="(image, index) in listing.images" :key="index">
            <input type="text" :name="'image-' + index" v-model="listing.images[index]" placeholder="Image URL" required>
            <button type="button" @click="removeImage(index)">Remove</button>
        </div>
        <button type="button" @click="addImage">Add Image</button>

        <button @click="updateListing">Update Listing</button>

        <label for="images">Edit User Image Gallery:</label>
            <div v-for="(photoGroup, groupIndex) in listing.photos" :key="groupIndex">
                <div v-for="(photo, photoIndex) in photoGroup.photos" :key="photoIndex">
                    <img :src="photo" :alt="`Photo ${groupIndex + 1}-${photoIndex + 1}`" width="300px">
                    <button type="button" @click="deletePhotos(groupIndex)">Delete</button>
                </div>
            </div>
        <button @click="updatePhotos">Update Photo Gallery</button>

    </div>
</template>