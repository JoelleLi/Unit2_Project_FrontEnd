<script setup>
import { ref } from "vue"
/*-----------*/
const { fetchData, userEmail } = defineProps(["fetchData", "userEmail"])
/*-----------*/
const listing = ref({
    name: "",
    location: "",
    address: "",
    userEmail: userEmail,
    image: ""
    // image: { url: "" }
})

function addListing(e) {
    e.preventDefault()
    if ( listing.value.name === "" || listing.value.location === "") {
        alert("All values are required")
        return
    }
    listing.value.userEmail = userEmail
    console.log(listing.value)

    fetch(`${import.meta.env.VITE_API_URL}/listings/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(listing.value)
        // body: JSON.stringify(newListing)

    })
    .then(res => {
        console.log(userEmail)
        listing.value = {
            name: "",
            location: "",
            address: "",
            userEmail: userEmail,
            image: "",
        }
        console.log(res)
        console.log(listing.value.userEmail)

        fetchData()
        clearForm()
    })
    .catch(err => console.error(err))
}

function clearForm() {
    listing.value = {
        name: "",
        location: "",
        address: "",
        image: ""
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
        <label for="address">Address: *</label>
        <input type="text" name="address" placeholder="Address" v-model="listing.address" required>
        <label for="image">Image URL *</label>
        <input type="text" name="image" placeholder="Image" v-model="listing.image" required>
        <button @click="addListing">Add Listing</button>
    </div>
</template>