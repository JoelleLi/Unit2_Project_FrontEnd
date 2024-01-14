<script setup>
import { defineProps, ref } from "vue"

const { fetchData } = defineProps(["fetchData"])

const listing = ref({
    name: "",
    location: ""
})

function addListing(e) {
    e.preventDefault()
    if ( listing.value.name === "" || listing.value.location === "") {
        alert("All values are required")
        return
    }
    fetch(`${import.meta.env.VITE_API_URL}/listings/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(listing.value)
    })
    .then(res => {
        listing.value = {
            name: "",
            location: ""
        }
        console.log(res)
        fetchData()
        clearForm()
    })
    .catch(err => console.error(err))
}

function clearForm() {
    listing.value = {
        name: "",
        location: ""
    }
}

</script>

<template>
    <h3>Add a new listing</h3>
    <div class="listingForm">
        <label for="name">Name: *</label>
        <input type="text" name="name" placeholder="Name" v-model="listing.name" required>
        <label for="location">Location: *</label>
        <input type="text" name="location" placeholder="Location" v-model="listing.location" required>
        <button @click="addListing">Add Listing</button>
    </div>
</template>