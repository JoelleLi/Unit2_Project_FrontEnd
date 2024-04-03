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
  <h4 class="mt-3 mb-3">Public Listings</h4>
  <div class="grid-wrapper-mainlistings mb-5">
    <div v-for="listing in listingsBe" :key="listing._id">
      <RouterLink :to="'/listings/' + listing._id">
        <div class="card border-0">
          <img :src="listing.image" class="card-img-top" :alt="listing.name">
          <div class="card-body">
              <p class="card-text text-primary-emphasis">{{ listing.name }}</p>
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
