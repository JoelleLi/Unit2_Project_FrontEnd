<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onMounted, computed } from "vue"
import { useCookies } from "vue3-cookies"
import { decodeCredential } from "vue3-google-login"
const { cookies } = useCookies()

const router = useRouter()
const isLoggedIn = ref(false)
let userName = ""
const userEmail = ref("")
const listingsBe = ref([])
const inputText = ref("")
// const filteredListings = [""]
const searchTerm = ref('')


const fetchData = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/listings`);
        const result = await response.json();
        listingsBe.value = result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// const submitForm = async () => {
//   // console.log("form submitted")
//   // console.log("Search term:", inputText.value)

//   await fetchData()

//   // console.log(listingsBe.value)

//   const filteredListings = listingsBe.value.filter(listing => {
//     return listing.name.toLowerCase().includes(inputText.value.toLowerCase())
//   })

//   console.log("Filtered Listings:", filteredListings)
//   // router.push({ name: "searchresults" , params : { filteredList : filteredListings } })
// }

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
    console.log(userData)

    console.log(userData.email)

    userEmail.value = userData.email

    // const myListingsLink = document.getElementById("mylistings-link")
    // myListingsLink.classList = "nav-link"

    // const logOutLink = document.getElementById("login")
    // logOutLink.innerText = "Log Out"
   }
}

onMounted(checkSession, fetchData)

</script>

<template>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<link rel="stylesheet" href="./assets/main.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap" rel="stylesheet">
<header>
  
<div class="container">
  <div class="row" id="header-bar">
  </div>
  <div class="row">
    <div class="col-md-2" id="nav-wrapper">
      <div class="nav-wrapper2">
        <div id="icon-wrapper" class="col-2">
          <img id="icon" src="./assets/images/shootfinder.png" alt="shootfinder logo">
          <img src="./assets/images/shootfindericon.png" alt="shootfinder icon"
          width="100px">
        </div>
        <nav class="navbar flex-column">
          <a class="nav-link">
            <RouterLink to="/" class="nav-text">Home</RouterLink>
          </a> 
          <a class="nav-link">
            <RouterLink to="/searchpage" class="nav-text">Search</RouterLink>
          </a> 
          <a class="nav-link">
            <RouterLink to="/categories" class="nav-text">Categories</RouterLink>
          </a> 
          <a class="nav-link">
            <RouterLink to="/listings" class="nav-text">All Listings</RouterLink>
          </a> 
          <a class="nav-link" id="mylistings-link">
            <RouterLink to="/mylistings" class="nav-text">My Listings</RouterLink>
          </a> 
          <a class="nav-link" id="newlisting-link">
            <RouterLink to="/newlisting" class="nav-text">Add Listing</RouterLink>
          </a> 

        </nav> 
      </div>
    </div>
    <div class="col-md-10 d-flex flex-column" id="main-content-wrapper">

      <div class="w-100 d-block" id="header-bar-wrapper">

        <!-- <form @submit.prevent="submitForm">
          <input v-model="inputText" type="text" placeholder="Search">
          <input type="submit" name="" id="">
        </form> -->



        <!-- <RouterLink to="/login" class="links" id="login">Login</RouterLink> -->

      </div>

      <div>
          <RouterView />
      </div>
    </div>
  </div>
</div>
</header>
</template>





