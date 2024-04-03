<script setup>
import router from "@/router";
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
    private: false,
    telephone: "",
    emailAddress: "",
    description: ""
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
            private: "",
            telephone: "",
            emailAddress: "",
            description: ""
        }
        console.log(res)
        console.log(listing.value.userEmail)
        console.log(listing.value)


        // fetchData()
        // clearForm()
        router.push("/mylistings")
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
        private: "",
        telephone: "",
        emailAddress: "",
        description: ""
    }
}

</script>

<template>
    <h4 class="mt-3 mb-3">New Listing</h4>

    <form class="row g-3">
        <div class="col-12">
            <label for="name" class="form-label">Listing Name</label>
            <input type="text" name="name" class="form-control" 
            placeholder="Light and airy Hackney studio"
            v-model="listing.name" required
            >
            <div class="form-text">Use key words such as the location to help your listing appear in search results.</div>
        </div>

        <div class="col-12 mt-2">
            <label for="city" class="form-label">City</label>
            <input type="text" name="city" class="form-control" placeholder="City"
            v-model="listing.city" required
            >
        </div>

        <div class="col-12 mt-1">
            <label for="address" class="form-label">Address</label>
            <input type="text" name="address" class="form-control" placeholder="Address"
            v-model="listing.address" required
            >
        </div>

        <div class="col-12 mt-3">
            <div class="form-check">
                <input name="public" class="form-check-input" type="checkbox" id="gridCheck"
                v-model="listing.public"
                >
                <label class="form-check-label" for="public">
                    Public
                </label>
            </div>
            <div class="form-check">
                <input name="private" class="form-check-input" type="checkbox" id="gridCheck"
                v-model="listing.private"
                >
                <label class="form-check-label" for="private">
                    Private
                </label>
            </div>
        </div>

        <div class="col-md-6">
            <label for="telephone" class="form-label">Telephone</label>
            <input name="telephone" type="text" class="form-control" id="inputPassword4"
            v-model="listing.telephone" required>
        </div>

        <div class="col-md-6">
            <label for="email" class="form-label">Email</label>
            <input name="email" type="email" class="form-control" id="inputEmail4"
            v-model="listing.emailAddress" required>
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
            placeholder="Include all important info here such as rates and accessibility."
            name="description" v-model="listing.description" required
            ></textarea>
        </div>

        <div class="col-12">
            <label for="image" class="form-label">Main Image</label>
            <input name="image" type="text" class="form-control" placeholder="Image URL"
            v-model="listing.image" required>
            <div class="form-text">Add the URL of the main image that will show up in search results.</div>
        </div>

        <div>
            <label for="images">Images *</label>

            <div v-for="(image, index) in listing.images" :key="index" class="row g-3 mt-1 mb-1">
                <div class="col-auto">
                    <input type="text" class="form-control" :name="'image-' + index" v-model="listing.images[index]" placeholder="Image URL" required>
                </div>
                <div class="col-auto">
                    <button  class="btn btn-light" type="button" @click="removeImage(index)">Remove</button>
                </div>
                <div class="col-auto">
                    <button class="btn btn-light" type="button" @click="addImage">Add Image</button>
                </div>
            </div>

        </div>

        <div class="col-12">
            <button class="btn btn-primary mb-5" @click="addListing">Add Listing</button>
        </div>
    </form>








    <!-- <div class="container form-container">
        <div class="listingForm">
            <label for="name">Name: *</label>
            <input type="text" name="name" placeholder="Name" v-model="listing.name" required>

            <label for="location">City: *</label>
            <input type="text" name="city" placeholder="City" v-model="listing.city" required>

            <label for="address">Address: *</label>
            <input type="text" name="address" placeholder="Address" v-model="listing.address" required>

            <label for="public">Public?</label>
            <input type="checkbox" name="public" v-model="listing.public">

            <label for="private">Private?</label>
            <input type="checkbox" name="private" v-model="listing.private">

            <label for="telephone">Telephone: *</label>
            <input type="text" name="telephone" placeholder="Telephone" v-model="listing.telephone" required>
            
            <label for="email">Email: *</label>
            <input type="text" name="email" placeholder="Email" v-model="listing.emailAddress" required>

            <label for="description">Info: *</label>
            <input type="text" name="description" placeholder="Add description/ rates/ accessibility" v-model="listing.description" required>

            <label for="image">Image URL *</label>
            <input type="text" name="image" placeholder="Image URL" v-model="listing.image" required>
            
            <div class="image-form">

                <label for="images">Images URLs *</label>
                <div v-for="(image, index) in listing.images" :key="index">
                    <input type="text" :name="'image-' + index" v-model="listing.images[index]" placeholder="Image URL" required>
                    <button  class="button" type="button" @click="removeImage(index)">Remove</button>
                </div>
                <button class="button" type="button" @click="addImage">Add Image</button>
            </div>
            
            <button class="button" @click="addListing">Add Listing</button>
        </div>
    </div> -->

</template>