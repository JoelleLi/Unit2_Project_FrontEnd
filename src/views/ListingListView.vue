<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"
import NewListing from "@/components/NewListing.vue"

const listingsBe = ref([])

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/listings`)
    .then( response => response.json() )
    .then( result => {
        listingsBe.value = result
    } )
}

function deleteListing(listingId) {
  fetch(`${import.meta.env.VITE_API_URL}/listings/${listingId}`, {
        method: "DELETE"
    })
    .then(() => {
        alert("Listing deleted")
        fetchData()
    })
    .catch(err => console.error(err))
}

onMounted(() => {
  fetchData()
})

</script>

<template>
  <h1>All Listings</h1>
  <ul>
    <li v-for="listing in listingsBe" :key="listing._id">
      <RouterLink :to="'/listings/' + listing._id">{{ listing.name }}</RouterLink> &nbsp;
      <button @click="deleteListing(listing._id)">Delete Listing</button> &nbsp; 
      <RouterLink :to="'/listings/update/' + listing._id">Edit Listing</RouterLink>
    </li>
  </ul>
  <hr>
  <NewListing :fetchData="fetchData"/>
</template>
