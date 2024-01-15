<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

const router = useRouter()

const listing = ref({})
const listingsBe = ref([])


onMounted(() => {
    const route = useRoute()

    fetch(`${import.meta.env.VITE_API_URL}/listings/${route.params.id}`)

    .then(response => response.json())
    .then( result => {
        listing.value = result
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

</script>

<template>
    <h1>{{ listing.name }}</h1>
    <h4>{{ listing.location }}</h4>
    <RouterLink :to="'/listings/update/' + listing._id">Edit Listing</RouterLink>
    <button @click="deleteListing(listing._id)">Delete Listing</button> &nbsp; 
</template>