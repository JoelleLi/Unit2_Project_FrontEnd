<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const listing = ref({})

onMounted(() => {
    const route = useRoute()

    fetch(`${import.meta.env.VITE_API_URL}/listings/${route.params.id}`)

    .then(response => response.json())
    .then( result => {
        listing.value = result
    })
    .catch(err => console.error(err))
})

</script>

<template>
    <h1>{{ listing.name }}</h1>
    <h4>{{ listing.location }}</h4>
</template>