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
    <div class="categories-wrapper">
        <h3>Listings by City</h3>
        <div v-for="city in uniqueCities" :key="city">
            <RouterLink class="links" :to="'/categories/city/' + encodeURIComponent(city)">{{ city }}</RouterLink> &nbsp;
        </div>
    </div>
    <div class="categories-wrapper">
        <h3>
            <RouterLink class="links" :to="'/categories/public/'">Public Listings</RouterLink>
        </h3>
        <h3>
            <RouterLink class="links" :to="'/categories/private/'">Private Listings</RouterLink>
        </h3>        
    </div>


    
</template>