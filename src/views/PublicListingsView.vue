<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"

const listingsBe = ref([])

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/categories/public`)
    .then( response => response.json() )
    .then( result => {
        listingsBe.value = result
    } )
}

onMounted(() => {
  fetchData()
})

</script>

<template>
  <h1>Public Listings</h1>
  <ul>
    <li v-for="listing in listingsBe" :key="listing._id">
      <RouterLink :to="'/listings/' + listing._id">
        <div class="listing-container">
          <div class="listing-image">
            <img :src="listing.image" :alt="listing.name + ' Image'" width="200" />
          </div>
          <div class="listing-details">
            <span>{{ listing.name }}</span>
          </div>
        </div>
      </RouterLink> &nbsp;
    </li>
  </ul>
  <hr>
</template>
