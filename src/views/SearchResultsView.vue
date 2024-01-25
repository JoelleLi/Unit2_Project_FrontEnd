<script setup>
import { onMounted, ref,  } from 'vue'

// const router = useRouter 
const listingsBe = ref([])
const filteredListings = ref([])

const fetchData = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/listings`)
        const result = await response.json()
        listingsBe.value = result
        filteredListings.value = result
        console.log(filteredListings.value)
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

const props = defineProps (["filteredList"])


onMounted (async () => {
    await fetchData()
    console.log("Filtered Listings in searchResultsView:")
    // console.log(router.currentRoute.value.params)
})

</script>

<template>
    <div>
    <h2>Search Results</h2>
        <ul>
            <li v-for="listing in filteredListings" :key="listing._id">
                Listing
                {{ listing.name }}
            </li>
        </ul>
    </div>
</template>

