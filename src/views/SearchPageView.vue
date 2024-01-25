<script setup>
import { ref, onMounted, computed } from "vue"

const listingsBe = ref([])
const searchTerm = ref("")

const fetchData = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/listings`);
        const result = await response.json();
        listingsBe.value = result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const filteredListings = computed(() => {
  console.log("running")
  const newList = listingsBe.value.filter(listing => 
  listing.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
  console.log(newList)
  return newList
})

onMounted(fetchData)

</script>

<template>
    <div class="mainlistings-wrapper">
        <div class="search-bar">
        <input type="text" v-model="searchTerm" placeholder="Search by name">
        </div>
        <div class="grid-wrapper-mainlistings">
            <div v-for="listing in filteredListings" :key="listing._id">
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
                </RouterLink>
            </div>
        </div>
        </div>
</template>