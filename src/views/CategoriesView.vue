<script setup>
import { ref, onMounted, computed } from "vue"
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
    return Array.from(cities)
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
    <div class="public-categories-wrapper">
        <div class="public-listing-wrapper">
            <img class="publicimage" src="https://1.bp.blogspot.com/-RYrRBKA9Eng/X6Vl8XbbIUI/AAAAAAAACWs/FjWgOJxG8oMXtV6N3IiDDe1DFy44GCZXgCNcBGAsYHQ/w640-h426/Crisis%2BFarm%2B18.jpg" alt="graffiti wall in london">
            <RouterLink class="links" :to="'/categories/public/'">Public Listings</RouterLink>
        </div>
        <div class="public-listing-wrapper">
            <img class="publicimage" src="https://cdn-v2.theculturetrip.com/1280x713/wp-content/uploads/2020/01/pt2pw5.webp" alt="graffiti wall in london">
            <RouterLink class="links" :to="'/categories/private/'">Private Listings</RouterLink>
        </div>
    </div>
    <div class="categories-wrapper">
        <p>Listings by City</p>
        <div class="cities-wrapper">
            <div v-for="city in uniqueCities" :key="city">
            <RouterLink class="links" :to="'/categories/city/' + encodeURIComponent(city)">{{ city }}</RouterLink> &nbsp;
            </div>
        </div>
    </div>


    
</template>