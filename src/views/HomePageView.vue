<script setup>
import { ref, onMounted, computed } from "vue"
import LoginMessage from "@/components/LoginMessage.vue"
import { useCookies } from "vue3-cookies"
import { decodeCredential } from "vue3-google-login"
const { cookies } = useCookies()

const listingsBe = ref([])
const searchTerm = ref("")
const isLoggedIn = ref(false)
let userName = ""
const userEmail = ref("")

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

const checkSession = () => {
  if( cookies.isKey("user_session") ) {
    isLoggedIn.value = true
    const userData = decodeCredential(cookies.get("user_session"))
    userName = userData.given_name
    // console.log(userData)

    // console.log(userData.email)
    userEmail.value = userData.email

  }
}

onMounted(() => {
  fetchData()
  checkSession()
})

</script>

<template>
    <LoginMessage />
    <div class="mainlistings-wrapper">
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Search</span>
            <input type="text" v-model="searchTerm" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="grid-wrapper-mainlistings">
            <div v-for="listing in filteredListings" :key="listing._id">
                <RouterLink :to="'/listings/' + listing._id">
                    <div class="listing-container">
                        <div class="listing-image-wrapper">
                            <img class="listing-image" :src="listing.image" :alt="listing.name + ' Image'" width="200" height="130px" />
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