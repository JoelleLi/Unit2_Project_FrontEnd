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
  <h3>Public Listings</h3>
  <div class="grid-wrapper-mainlistings">
    <div v-for="listing in listingsBe" :key="listing._id">
      <RouterLink :to="'/listings/' + listing._id">
        <div class="listing-container">
          <div class="listing-image-wrapper">
            <img class="listing-image" :src="listing.image" :alt="listing.name + ' Image'" width="200" />
          </div>
          <div class="listing-details">
            <span class="listing-details">
              {{ listing.name }}
            </span>
          </div>
        </div>
      </RouterLink> &nbsp;
    </div>
  </div>


  <!-- <h3>Public Listings</h3>
    <div v-for="listing in listingsBe" :key="listing._id">
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
    </div>
  <hr> -->
</template>
