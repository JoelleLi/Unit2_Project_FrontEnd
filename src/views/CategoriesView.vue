<script setup>
import { ref, onMounted, computed } from "vue"
import "./Categories.css"
const listingsBe = ref([])

const fetchData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/listings`)
    .then( response => response.json() )
    .then( result => {
        listingsBe.value = result
    } )
}

onMounted(() => {
  fetchData()
})

const uniqueCities = computed(() => {
    const cities = new Set()
    listingsBe.value.forEach((listing) => {
        cities.add(listing.city)
    });
    return Array.from(cities).sort()
})

// const listingsBe = ref([])
// const myCity = ref("")
// console.log(myCity.value)

// onMounted(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/categories/city/${myCity.value}`)

//     .then( response => response.json() )
//     .then( result => {
//         listingsBe.value = result
//         console.log(myCity.value)
//     })
//     .catch(err => console.error(err))
// })

</script>

<template>

    <div class="container">
        <h4 class="mt-3 mb-3">Categories</h4>

    <div class=" outerCatWrapper">
        <div>
            <RouterLink :to="'/categories/private/'">
                <span class="badge rounded-pill text-bg-primary mb-1 catButton">Private Listings</span>
            </RouterLink>
        </div> &nbsp;

        <div>
            <RouterLink :to="'/categories/public/'">
                <span class="badge rounded-pill text-bg-primary mb-1 catButton">Public Listings</span>
            </RouterLink>
        </div>

        </div>

        <h4 class="mt-3 mb-3">Listings by City</h4>
        <div class="outerCatWrapper">
            <div v-for="city in uniqueCities" :key="city">
            <RouterLink class="links" :to="'/categories/city/' + encodeURIComponent(city)">
                <span class="badge rounded-pill text-bg-light cityButton">{{ city }}</span>
            </RouterLink> &nbsp;
            </div>
        </div>
    </div>

</template>