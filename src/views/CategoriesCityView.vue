<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()
const listingsBe = ref([])
const myCity = route.params.city

onMounted(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories/city/${myCity}`)

    .then( response => response.json() )
    .then( result => {
        listingsBe.value = result
    })
    .catch(err => console.error(err))
})

</script>
 
<template>
    <h4 class="mt-3 mb-3">{{ myCity }}</h4>
    <div class="grid-wrapper-mainlistings">
        <div v-for="listing in listingsBe" :key="listing._id">
            <RouterLink :to="'/listings/' + listing._id">
                <div class="card border-0">
                    <img :src="listing.image" class="card-img-top" :alt="listing.name">
                    <div class="card-body">
                        <p class="card-text">{{ listing.name }}</p>
                    </div>
                </div>
            </RouterLink> &nbsp;
        </div>
    </div>
    <hr>

    <!-- <div class="grid-wrapper">
        <div v-for="listing in listingsBe" :key="listing._id">
            <RouterLink :to="'/listings/' + listing._id">
                <div class="listing-container">
                    <div class="listing-image">
                        <img :src="listing.image" :alt="listing.name + ' Image'" width="300" height="300" />
                    </div>
                    <div class="listing-details">
                        <span>
                            {{ listing.name }}
                        </span>
                    </div>
                </div>
            </RouterLink> &nbsp;
        </div>
    </div> -->
</template>