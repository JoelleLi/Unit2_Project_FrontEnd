<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()
console.log(route.params)

const listingsBe = ref([])
const myCity = route.params.city

onMounted(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories/city/${myCity}`)

    .then( response => response.json() )
    .then( result => {
        listingsBe.value = result
        console.log(listingsBe.value)
    })
    .catch(err => console.error(err))
})

</script>

<template>
    <h3>{{ myCity }}</h3>
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