<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const listingId = route.params.id

const listing = ref({
    name: "",
    city: "",
    address: "",
    image: "",
    images: [""],
    public: "",
    private: "",
    contactInfo: ""
})

const LoadListingData = () => {
    console.log(listing.value)

    fetch(`${import.meta.env.VITE_API_URL}/listings/${listingId}`)
    .then(res => res.json())
    .then(data => {
        listing.value = {
            name: data.name,
            city: data.city,
            address: data.address,
            image: data.image,
            images: data.images || [],
            public: data.public,
            private: data.private,
            contactInfo: data.contactInfo
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

const addImage = () => {
    listing.value.images.push(''); // Add a new empty string for a new image
}

const removeImage = (index) => {
    listing.value.images.splice(index, 1); // Remove the image at the specified index
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

        <label for="contactInfo">Contact Info: *</label>
        <input type="text" name="contactInfo" placeholder="ContactInfo" v-model="listing.contactInfo" required>
        
        <label for="image">Image URL: *</label>
        <input type="text" name="image" placeholder="Image" v-model="listing.image" required>
        
        <label for="images">Images URLs:</label>
        <div v-for="(image, index) in listing.images" :key="index">
            <input type="text" :name="'image-' + index" v-model="listing.images[index]" placeholder="Image URL" required>
            <button type="button" @click="removeImage(index)">Remove</button>
        </div>
        <button type="button" @click="addImage">Add Image</button>

        <button @click="updateListing">Update Listing</button>
    </div>
</template>