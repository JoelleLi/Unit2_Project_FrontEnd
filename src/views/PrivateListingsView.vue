<script setup>
import { ref, onMounted } from "vue"
import { RouterLink } from "vue-router"

const listingsBe = ref([])

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/categories/private`)
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
  <h4 class="mt-3 mb-3">Private Listings</h4>
  <div class="grid-wrapper-mainlistings mb-5">
    <div v-for="listing in listingsBe" :key="listing._id">
      <RouterLink :to="'/listings/' + listing._id">
        <div class="card">
          <img :src="listing.image" class="card-img-top" :alt="listing.name">
          <div class="card-body">
              <p class="card-text text-primary-emphasis">{{ listing.name }}</p>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
