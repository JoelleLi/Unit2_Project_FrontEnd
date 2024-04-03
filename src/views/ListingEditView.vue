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
            telephone: data.telephone,
            emailAddress: data.emailAddress,
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
        router.push("/listings/" + listingId)
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
        router.replace({ name: "listings" })
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
    <h4 class="mt-3 mb-3">Edit {{ listing.name }}</h4>


    <form class="row g-3">
        <div class="col-12">
            <label for="name" class="form-label">Listing Name</label>
            <input type="text" name="name" class="form-control" 
            placeholder="Light and airy Hackney studio"
            v-model="listing.name" required
            >
            <div class="form-text">Use key words such as the location to help your listing appear in search results.</div>
        </div>

        <div class="col-12 mt-2">
            <label for="city" class="form-label">City</label>
            <input type="text" name="city" class="form-control" placeholder="City"
            v-model="listing.city" required
            >
        </div>

        <div class="col-12 mt-1">
            <label for="address" class="form-label">Address</label>
            <input type="text" name="address" class="form-control" placeholder="Address"
            v-model="listing.address" required
            >
        </div>

        <div class="col-12 mt-3">
            <div class="form-check">
                <input name="public" class="form-check-input" type="checkbox" id="gridCheck"
                v-model="listing.public"
                >
                <label class="form-check-label" for="public">
                    Public
                </label>
            </div>
            <div class="form-check">
                <input name="private" class="form-check-input" type="checkbox" id="gridCheck"
                v-model="listing.private"
                >
                <label class="form-check-label" for="private">
                    Private
                </label>
            </div>
        </div>

        <div class="col-md-6">
            <label for="telephone" class="form-label">Telephone</label>
            <input name="telephone" type="text" class="form-control" 
            v-model="listing.telephone" required>
        </div>

        <div class="col-md-6">
            <label for="email" class="form-label">Email</label>
            <input name="email" type="email" class="form-control"
            v-model="listing.emailAddress" required>
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
            placeholder="Include all important info here such as rates and accessibility."
            name="description" v-model="listing.description" required
            ></textarea>
        </div>

        <div class="col-12">
            <label for="image" class="form-label">Main Image</label>
            <input name="image" type="text" class="form-control" placeholder="Image URL"
            v-model="listing.image" required>
            <div class="form-text">Add the URL of the main image that will show up in search results.</div>
        </div>

        <div>
            <label for="images">Images *</label>

            <div v-for="(image, index) in listing.images" :key="index" class="row g-3 mt-1 mb-1">
                <div class="col-auto">
                    <input type="text" class="form-control" :name="'image-' + index" v-model="listing.images[index]" placeholder="Image URL" required>
                </div>
                <div class="col-auto">
                    <button  class="btn btn-light" type="button" @click="removeImage(index)">Remove</button>
                </div>
                <div class="col-auto">
                    <button class="btn btn-light" type="button" @click="addImage">Add Image</button>
                </div>
            </div>

            <div v-if="listing.images.length === 0">
                <div class="col-auto mt-2">
                    <button class="btn btn-light" type="button" @click="addImage">Add Image</button>
                </div>
            </div>

        </div>

        <div class="col-12">
            <button class="btn btn-primary mb-5" @click="updateListing">Update Listing</button>
            <RouterLink :to="'/listings/' + listing._id">
                <button class="btn btn-primary mb-5 ms-5">Back</button>
            </RouterLink>
        </div>
    </form>


    <!-- <label for="images">Edit User Image Gallery:</label>
        <div v-for="(photoGroup, groupIndex) in listing.photos" :key="groupIndex">
            <div v-for="(photo, photoIndex) in photoGroup.photos" :key="photoIndex">
                <img :src="photo" :alt="`Photo ${groupIndex + 1}-${photoIndex + 1}`" width="300px">
            </div>
            <button type="button" @click="deletePhotos(groupIndex)">Delete</button>
        </div>

    <button @click="updatePhotos">Update Photo Gallery</button> -->
</template>