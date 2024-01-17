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
    <h1>Categories</h1>
    <h2>Listings by City</h2>
    <ul>
        <li v-for="city in uniqueCities" :key="city">
            <RouterLink :to="'/categories/city/' + encodeURIComponent(city)">{{ city }}</RouterLink> &nbsp;
        </li>
    </ul>
</template>