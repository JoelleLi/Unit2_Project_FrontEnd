<script setup>
import { ref } from "vue"

const { fetchData, userEmail } = defineProps(["fetchData", "userEmail"])

const listing = ref({
    name: "",
    city: "",
    address: "",
    userEmail: userEmail,
    image: "",
    images: [""],
    public: false,
    private: false
})

const addImage = () => {
  listing.value.images.push(''); // Add a new empty string for a new image
};

const removeImage = (index) => {
  listing.value.images.splice(index, 1); // Remove the image at the specified index
};


function addListing(e) {
    e.preventDefault()
    if ( listing.value.name === "" || listing.value.city === "") {
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
            city: "",
            address: "",
            userEmail: userEmail,
            image: "",
            images: [""],
            public: "",
            private: ""
        }
        console.log(res)
        console.log(listing.value.userEmail)
        console.log(listing.value)


        fetchData()
        clearForm()
    })
    .catch(err => console.error(err))
}

function clearForm() {
    listing.value = {
        name: "",
        city: "",
        address: "",
        image: "",
        images: [""],
        public: "",
        private: ""
    }
}

</script>

<template>
    <h3>Add a new listing</h3>
    <div class="listingForm">
        <label for="name">Name: *</label>
        <input type="text" name="name" placeholder="Name" v-model="listing.name" required>

        <label for="location">City: *</label>
        <input type="text" name="city" placeholder="City" v-model="listing.city" required>

        <label for="address">Address: *</label>
        <input type="text" name="address" placeholder="Address" v-model="listing.address" required>

        <!-- <label for="public">Public?: *</label>
        <input type="text" name="public" placeholder="Public" v-model="listing.public" required>

        <label for="private">Private?: *</label>
        <input type="text" name="private" placeholder="Private" v-model="listing.private" required>
         -->
        <label for="public">Public?</label>
        <input type="checkbox" name="public" v-model="listing.public">

        <label for="private">Private?</label>
        <input type="checkbox" name="private" v-model="listing.private">

        <label for="image">Image URL *</label>
        <input type="text" name="image" placeholder="Image URL" v-model="listing.image" required>
        
        <div class="image-form">
            <!-- <label for="image">Images URLs *</label>
            <input type="text" name="images" placeholder="Images URLs" v-model="listing.images" required> -->

            <label for="images">Images URLs *</label>
            <div v-for="(image, index) in listing.images" :key="index">
                <input type="text" :name="'image-' + index" v-model="listing.images[index]" placeholder="Image URL" required>
                <button type="button" @click="removeImage(index)">Remove</button>
            </div>
            <button type="button" @click="addImage">Add Image</button>
        </div>
        
        <button @click="addListing">Add Listing</button>
    </div>
</template>