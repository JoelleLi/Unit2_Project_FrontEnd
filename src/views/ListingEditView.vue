<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const listingId = route.params.id

const listing = ref({
    name: "",
    location: "",
    address: "",
    image: ""
})

const LoadListingData = () => {
    console.log(listing.value)

    fetch(`${import.meta.env.VITE_API_URL}/listings/${listingId}`)
    .then(res => res.json())
    .then(data => {
        listing.value = {
            name: data.name,
            location: data.location,
            address: data.address,
            image: data.image
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
onMounted(LoadListingData)

</script>

<template>
    <h1>Edit {{ listing.name }}</h1>
    <div class="listingForm">
        <label for="name">Name: *</label>
        <input type="text" name="name" placeholder="Name" v-model="listing.name" required>
        <label for="location">Location: *</label>
        <input type="text" name="location" placeholder="Location" v-model="listing.location" required>
        <label for="address">Address: *</label>
        <input type="text" name="address" placeholder="Address" v-model="listing.address" required>
        <label for="image">Image URL: *</label>
        <input type="text" name="image" placeholder="Image" v-model="listing.image" required>
        <button @click="updateListing">Update Listing</button>
    </div>
</template>